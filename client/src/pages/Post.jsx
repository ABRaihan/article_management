import { useParams } from "react-router-dom";

function Post() {
    const { id } = useParams();
    console.log(id)
	return (
		<section>
			<div className='container'>
				<p>My first post</p>
				<div
					dangerouslySetInnerHTML={{
						__html: '<h1><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqwAAAGhCAYAAACktOZzAAABQ2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAyiDHwMLAyKCXmFxc4BgQ4ANUwgCjUcG3a0B1QHBZF2TWpuKVT+fO5MsuElKxFmq68gxTPQrgSkktTgbSf4A4NbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOD2cVdwC/XxUfBwIeBaMkBJakUJiHbOL6gsykzPKFFwBIZSqoJnXrKejoKRgZEhAwMozCGqP98AhyWjGAdCrBDoRytPBgamXIRYQgADw44PIK8ixFR1GBh4jjMwHIgtSCxKhDuA8RtLcZqxEYTNvZ2BgXXa//+fwxkY2DUZGP5e////9/b/..'
					}}
				></div>
			</div>
		</section>
	);
}

export default Post;
