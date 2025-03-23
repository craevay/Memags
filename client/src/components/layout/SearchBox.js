import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
  width: 0;
  opacity: 0;
  transition: width 0.3s ease, opacity 0.3s ease;
  
  &.active {
    width: 180px;
    opacity: 1;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:focus {
    outline: none;
  }
`;

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
      setActive(false);
    } else {
      navigate('/');
    }
  };

  const toggleSearch = () => {
    setActive(!active);
    if (active && keyword.trim()) {
      submitHandler({ preventDefault: () => {} });
    }
  };

  return (
    <SearchForm onSubmit={submitHandler}>
      <SearchInput
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
        value={keyword}
        className={active ? 'active' : ''}
      />
      <SearchButton type='button' onClick={toggleSearch}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SearchButton>
    </SearchForm>
  );
};

export default SearchBox;

