import PropTypes from 'prop-types';

const HomeCard = ({ title, items, linkText, linkHref }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.label}</span>
            <span className={item.valueClass || ''}>{item.value}</span>
          </li>
        ))}
      </ul>
      <a href={linkHref} className="block text-blue-500 mt-4">{linkText}</a>
    </div>
  );
};

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      valueClass: PropTypes.string,
    })
  ).isRequired,
  linkText: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
};

export default HomeCard;
