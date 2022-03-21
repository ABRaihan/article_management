function SearchBar(props) {
	return (
		<div className={style.search__bar__wrapper}>
			<input
				className={style.search__bar}
				type='search'
				placeholder='Search...'
				value={searchValue}
				onChange={postSearchHandler}
			/>
			<SearchItems
				items={posts}
				setItems={setPosts}
				setSearchValue={setSearchValue}
			/>
		</div>
	);
}

export default SearchBar;
