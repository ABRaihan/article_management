import { Link } from "react-router-dom";
import { isValidArray } from "../utility/ValueChecker";
import style from "../sass/components/searchItems.module.scss";
function SearchItems({ items, setItems, setSearchValue }) {
    const searchItemHandler = () => {
        setItems(false);
        setSearchValue("");
    }
	return (
		<>
			{items !== false && (
				<ul className={style.search_item}>
					{isValidArray(items)
						? items.map(({ post_id, title }) => (
								<Link
									key={post_id}
									to={"/post/" + post_id}
									onClick={searchItemHandler}
								>
									<li className={style.items}>{title}</li>
								</Link>
						  ))
						: items !== false && <li>No Items Found</li>}
				</ul>
			)}
		</>
	);
}

export default SearchItems;
