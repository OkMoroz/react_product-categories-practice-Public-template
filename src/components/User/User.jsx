import classNames from 'classnames';

export const User = props => {
  const { user, selectUser, isActive } = props;

  return (
    <a
      data-cy="FilterUser"
      href="#/"
      onClick={selectUser}
      className={classNames({ 'is-active': isActive })}
    >
      {user.name}
    </a>
  );
};
