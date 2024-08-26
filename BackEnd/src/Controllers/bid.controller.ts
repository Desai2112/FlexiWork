import { Request, Response } from "express";
import Job from "../Models/job.model";
import AssignedJob from "../Models/assignedjob.model";
import Bid from "../Models/bid.model";
import User from "../Models/user.model";

const addBid = async (req: Request, res: Response) => {
  try {
    const freelancerId = req.session.user;
    const user = await User.findOne({ _id: freelancerId }).select("name");
    const { jobId, bidAmount, deliveryTime, description } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    const bid = await Bid.find({
      jobId: jobId,
      freelancerId: freelancerId,
    });
    if (bid.length > 0) {
      return res
        .status(400)
        .json({ message: "Bid already placed", sucess: false });
    }
    const newBid = new Bid({
      jobId,
      freelancerId,
      description,
      status: "pending",
      bidAmount,
      deliveryTime,
      clientId: job.ClientId,
      freelancerName: user?.name,
    });
    await newBid.save();
    await job.updateOne({
      $push: { bids: newBid._id },
    });
    res.status(200).json({ message: "Bid placed successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const showProjectBid = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const clientId = req.session.user;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    if (job.ClientId && job.ClientId !== clientId) {
      return res
        .status(400)
        .json({ message: "Not authorized", success: false });
    }
    const bids = await Bid.find({ jobId: jobId });
    if (bids.length === 0) {
      return res.status(400).json({ message: "No bids found", success: false });
    }
    res.status(200).json({ bids, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const acceptJobBid = async (req: Request, res: Response) => {
  try {
    const { bidId } = req.params;
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(400).json({ message: "Bid not found", success: false });
    }
    const job = await AssignedJob.find({ jobId: bid.jobId });
    if (job.length > 0) {
      return res
        .status(400)
        .json({ message: "Job already assigned", success: false });
    }
    const newAssignedJob = new AssignedJob({
      jobId: bid.jobId,
      freelancerId: bid.freelancerId,
      status: "ongoing",
      AcceptedBid: bid.bidAmount,
      clientId: bid.clientId,
    });
    await newAssignedJob.save();
    await Bid.findByIdAndUpdate(bidId, { status: "accepted" }, { new: true });
    await Bid.updateMany(
      { jobId: bid.jobId, _id: { $ne: bidId } },
      { status: "rejected" },
    );
    await Job.findByIdAndUpdate(
      {
        _id: bid.jobId,
      },
      { status: "assigned" },
    );
    res.status(200).json({ message: "Bid accepted", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const rejectJobBid = async (req: Request, res: Response) => {
  try {
    const { bidId } = req.params;
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(400).json({ message: "Bid not found", success: false });
    }
    await Bid.findByIdAndUpdate(bidId, { status: "rejected" }, { new: true });
    res.status(200).json({ message: "Bid rejected", success: true });
  } catch (error) {
    console.log("Error in rejecting the Bid", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const sendProjectwiseBid = async (req: Request, res: Response) => {
  try {
    const clientId = req.session.user;
    const jobs = await Job.find({ ClientId: clientId });
    if (jobs.length === 0) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }
    const bids = await Bid.find({ clientId: clientId });
    if (bids.length === 0) {
      return res.status(400).json({ message: "No bids found", success: false });
    }
    res.status(200).json({ bids, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const sendAllProjectwiseBid = async (req: Request, res: Response) => {
  try {
    const clientId = req.session.user;
    const jobs = await Job.find({ ClientId: clientId })
      .populate("bids", "freelancerName bidAmount")
      .select("_id projectName");
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export {
  addBid,
  showProjectBid,
  acceptJobBid,
  rejectJobBid,
  sendProjectwiseBid,
  sendAllProjectwiseBid,
};
