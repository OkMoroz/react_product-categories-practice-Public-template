/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import classNames from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

import { Category } from './components/Category/Category';
import { Product } from './components/Product/Product';
import { User } from './components/User/User';
import { filterAndSortProducts } from './utils/filterAndSortProducts';

const SORT_BY_FIELDS = {
  id: 'ID',
  name: 'Product',
  categoryTitle: 'Category',
  userName: 'User',
};

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    item => item.id === product.categoryId,
  );
  const user = usersFromServer.find(item => item.id === category.ownerId);

  return {
    ...product,
    categoryTitle: category.title,
    categoryIcon: category.icon,
    userName: user.name,
    userSex: user.sex,
  };
});

export const App = () => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterByUser, setFilterByUser] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortingOrder, setSortingOrder] = useState('asc');

  const onReset = () => {
    setQuery('');
    setSortBy(null);
    setSelectedCategories([]);
    setFilterByUser(null);
  };

  const handleSearch = event => {
    setQuery(event.target.value);
  };

  const toggleCategory = categoryId => {
    setSelectedCategories(prevCategories => {
      return prevCategories.includes(categoryId)
        ? prevCategories.filter(id => id !== categoryId)
        : [...prevCategories, categoryId];
    });
  };

  const handleFilterByUser = user => {
    setFilterByUser(user);
  };

  const handleSort = column => {
    if (sortBy === column) {
      if (sortingOrder === 'asc') {
        setSortingOrder('desc');
      } else {
        setSortBy(null);
        setSortingOrder('asc');
      }
    } else {
      setSortBy(column);
      setSortingOrder('asc');
    }
  };

  const filteredProducts = filterAndSortProducts({
    products,
    query,
    selectedCategories,
    filterByUser,
    sortBy,
    sortingOrder,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames({
                  'is-active': !filterByUser,
                })}
                onClick={onReset}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <User
                  key={user.id}
                  user={user}
                  isActive={filterByUser && filterByUser.id === user.id}
                  selectUser={() => handleFilterByUser(user)}
                />
              ))}
            </p>
            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={handleSearch}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {query.length > 0 && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={onReset}
                    />
                  </span>
                )}
              </p>
            </div>
            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={classNames('button mr-6', {
                  'is-success': selectedCategories.length === 0,
                  'is-outlined': selectedCategories.length > 0,
                })}
                onClick={onReset}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <Category
                  key={category.id}
                  category={category}
                  isActive={selectedCategories.includes(category.id)}
                  handleClick={() => toggleCategory(category.id)}
                />
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={onReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              no products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {Object.entries(SORT_BY_FIELDS).map(([key, value]) => (
                    <th key={key}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {value}
                        <a href="#/" onClick={() => handleSort(key)}>
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={classNames('fas', {
                                'fa-sort': sortBy !== key || !sortingOrder,
                                'fa-sort-up':
                                  sortBy === key && sortingOrder === 'asc',
                                'fa-sort-down':
                                  sortBy === key && sortingOrder === 'desc',
                              })}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <Product key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
