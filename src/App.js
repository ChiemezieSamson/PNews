import { createBrowserRouter } from "react-router-dom";
import HomeLinks from "./Components/HomeLinks";
import IndexPage from "./Components/BlogPages/IndexPage";
import NotFound from "./Components/BlogPages/notFoundPage/NotFound";
import Books from "./Components/BlogPages/booksPage/Books";
import Favorite from "./Components/BlogPages/favoritePage/Favorite";
import About from "./Components/BlogPages/aboutPage/About";
import PrivacyAndPolicy from "./Components/BlogPages/policyPage/PrivacyAndPolicy";
import ContactUs from "./Components/BlogPages/contactUs/ContactUs";
import SinglePost from "./Components/BlogPages/singlePostPage/singlePost/SinglePost";
import WritePost from "./Components/BlogPages/singlePostPage/writePost/WritePost";
import EditPost from "./Components/BlogPages/singlePostPage/editPost/EditPost";
import UserPage from "./Components/UserComponents/UserPage";
import Personal from "./Components/UserComponents/UserPageComponents/Personal";
import MyPublicProfile from "./Components/UserComponents/UserPageComponents/MyPublicProfile";
import SingAndSecurity from "./Components/UserComponents/UserPageComponents/SingAndSecurity";
import LogIn from "./Components/LogIn/LogIn";
import RegistrationForm from "./Components/Registration/Registration";
import Category from "./Components/BlogPages/CategoriesPage/Category";
import BooksIndexPage from "./Components/BlogPages/booksPage/BooksIndexPage";
import BusinessIndexPage from "./Components/BlogPages/businessPage/BusinessIndexPage";
import Business from "./Components/BlogPages/businessPage/Business";
import FavoriteIndexPage from "./Components/BlogPages/favoritePage/favoriteIndexPage";
import LifeStyleIndexPage from "./Components/BlogPages/lifeStylePage/LifeStyleIndexPage";
import LifeStyle from "./Components/BlogPages/lifeStylePage/LifeStyle";
import QuotesIndexPage from "./Components/BlogPages/quotesPage/QuotesIndexPage";
import Quotes from "./Components/BlogPages/quotesPage/Quotes";
import PaginationPages from "./Components/BlogPages/PaginationComponents/paginationPage/PaginationPages";
import OtherPaginationPages from "./Components/BlogPages/PaginationComponents/paginationPage/OtherPaginationPages";
import SearchPage from "./Components/BlogPages/searchPage/SearchPage";
import General from "./Components/UserComponents/UserPageComponents/General";

const App = createBrowserRouter([
	{
		path: "/",
		element: <HomeLinks />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <IndexPage />,
				errorElement: <NotFound />,
			},
			{
				path: "books",
				element: <Books />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <BooksIndexPage />,
						errorElement: <NotFound />,
					},
					{
						path: "/books/:search",
						element: <Category />,
						errorElement: <NotFound />,
					},
					{
						path: "/books/pages",
						element: <OtherPaginationPages />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "lifestyle",
				element: <LifeStyle />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <LifeStyleIndexPage />,
						errorElement: <NotFound />,
					},
					{
						path: "/lifestyle/:search",
						element: <Category />,
						errorElement: <NotFound />,
					},
					{
						path: "/lifestyle/pages",
						element: <OtherPaginationPages />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "favorite",
				element: <Favorite />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <FavoriteIndexPage />,
						errorElement: <NotFound />,
					},
					{
						path: "/favorite/:search",
						element: <Category />,
						errorElement: <NotFound />,
					},
					{
						path: "/favorite/pages",
						element: <OtherPaginationPages />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "business",
				element: <Business />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <BusinessIndexPage />,
						errorElement: <NotFound />,
					},
					{
						path: "/business/:search",
						element: <Category />,
						errorElement: <NotFound />,
					},
					{
						path: "/business/pages",
						element: <OtherPaginationPages />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "quotes",
				element: <Quotes />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <QuotesIndexPage />,
						errorElement: <NotFound />,
					},
					{
						path: "/quotes/:search",
						element: <Category />,
						errorElement: <NotFound />,
					},
					{
						path: "/quotes/pages",
						element: <OtherPaginationPages />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "categories",
				element: <Category />,
				errorElement: <NotFound />,
			},
			{
				path: "tags",
				element: <Category />,
				errorElement: <NotFound />,
			},
			{
				path: "pages",
				element: <PaginationPages />,
				errorElement: <NotFound />,
			},
			{
				path: "about",
				element: <About />,
				errorElement: <NotFound />,
			},
			{
				path: "privacy&policy",
				element: <PrivacyAndPolicy />,
				errorElement: <NotFound />,
			},
			{
				path: "contact_us",
				element: <ContactUs />,
				errorElement: <NotFound />,
			},
			{
				path: "single/:postId",
				element: <SinglePost />,
				errorElement: <NotFound />,
			},
			{
				path: "writepost",
				element: <WritePost />,
				errorElement: <NotFound />,
			},
			{
				path: "editpost/:postId",
				element: <EditPost />,
				errorElement: <NotFound />,
			},
			{
				path: "login",
				element: <LogIn />,
				errorElement: <NotFound />,
			},
			{
				path: "registrationForm",
				element: <RegistrationForm />,
				errorElement: <NotFound />,
			},
			{
				path: "userpage",
				element: <UserPage />,
				errorElement: <NotFound />,
				children: [
					{
						index: true,
						element: <Personal />,
						errorElement: <NotFound />,
					},
					{
						path: "/userpage/security",
						element: <SingAndSecurity />,
						errorElement: <NotFound />,
					},
					{
						path: "/userpage/publicprofile",
						element: <MyPublicProfile />,
						errorElement: <NotFound />,
					},
					{
						path: "/userpage/General",
						element: <General />,
						errorElement: <NotFound />,
					},
				],
			},
			{
				path: "search",
				element: <SearchPage />,
				errorElement: <NotFound />,
			},
		],
	},
]);

export default App;
