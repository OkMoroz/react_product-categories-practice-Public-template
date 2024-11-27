import classNames from 'classnames';

export const Product = props => {
  const { product } = props;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        {product.id}
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        <span role="img" aria-label="emoji">
          {product.categoryIcon}
        </span>
        - {product.categoryTitle}
      </td>

      <td
        data-cy="ProductUser"
        className={classNames({
          'has-text-link': product.userSex === 'm',
          'has-text-danger': product.userSex === 'f',
        })}
      >
        {product.userName}
      </td>
    </tr>
  );
};
