import { createBrowserRouter } from "react-router-dom";
import HomeLinks from "./Components/HomeLinks";
import IndexPage from "./Components/BlogPages/IndexPage";
import NotFound from "./Components/BlogPages/notFoundPage/NotFound";
import Books from "./Components/BlogPages/booksPage/Books";
import LifeStyle from "./Components/BlogPages/lifeStylePage/LifeStyle";
import Favorite from "./Components/BlogPages/favoritePage/Favorite";
import Business from "./Components/BlogPages/businessPage/Business";
import Quotes from "./Components/BlogPages/quotesPage/Quotes";
import About from "./Components/BlogPages/aboutPage/About";
import PrivacyAndPolicy from "./Components/BlogPages/policyPage/PrivacyAndPolicy";
import ContactUs from "./Components/BlogPages/contactUs/ContactUs";
import Logo from "./Components/BlogPages/searchPage/Logo_Search";
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
import {
	// lodingData as rootLoader,
	action as rootAction,
} from "./Components/DataLoader/LodingData";

const App = createBrowserRouter([
	{
		path: "/",
		element: <HomeLinks />,
		errorElement: <NotFound />,
		// loader: rootLoader,
		action: rootAction,
		children: [
			{
				index: true,
				element: <IndexPage />,
			},
			{
				path: "books",
				element: <Books />,
				children: [
					{
						path: "/books/:postId",
						element: <Category />,
					},
				],
			},
			{
				path: "lifestyle",
				element: <LifeStyle />,
				children: [
					{
						path: "/lifestyle/:postId",
						element: <Category />,
					},
				],
			},
			{
				path: "favorite",
				element: <Favorite />,
				children: [
					{
						path: "/favorite/:postId",
						element: <Category />,
					},
				],
			},
			{
				path: "business",
				element: <Business />,
				children: [
					{
						path: "/business/:postId",
						element: <Category />,
					},
				],
			},
			{
				path: "quotes",
				element: <Quotes />,
				children: [
					{
						path: "/quotes/:postId",
						element: <Category />,
					},
				],
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "privacy&policy",
				element: <PrivacyAndPolicy />,
			},
			{
				path: "contactus",
				element: <ContactUs />,
			},
			{
				path: "single/:postId",
				element: <SinglePost />,
			},
			{
				path: "writepost",
				element: <WritePost />,
			},
			{
				path: "editpost/:postId",
				element: <EditPost />,
			},
			{
				path: "login",
				element: <LogIn />,
			},
			{
				path: "registrationForm",
				element: <RegistrationForm />,
			},
			{
				path: "userpage",
				element: <UserPage />,
				children: [
					{
						index: true,
						element: <Personal />,
					},
					{
						path: "/userpage/:securityId",
						element: <SingAndSecurity />,
					},
					{
						path: "/userpage/:publicprofileId",
						element: <MyPublicProfile />,
					},
				],
			},
			{
				path: "logo",
				element: <Logo />,
			},
		],
	},
]);

export default App;
