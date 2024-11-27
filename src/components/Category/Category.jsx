import classNames from 'classnames';

export const Category = props => {
  const { category, handleClick, isActive } = props;

  return (
    <a
      data-cy="Category"
      className={classNames('button mr-2 my-1', { 'is-info': isActive })}
      href="#/"
      onClick={handleClick}
    >
      {category.title}
    </a>
  );
};
