import {
	FaClock,
	FaEnvelope,
	FaFacebook,
	FaFax,
	FaInstagram,
	FaLinkedin,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaRss,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";

export const publicFolder = "https://newblog-api-pwju.onrender.com/images/";

export const parentCategoriesAndTags = [
	"books",
	"lifestyle",
	"favorite",
	"business",
	"random",
];

export const SocialMediaIcons = [
	{
		id: 1,
		name: "instagram",
		icon: (
			<FaInstagram
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#e4405f]"
			/>
		),
		link: "https://www.instagram.com",
		socialLinks: "text-[#e4405f]",
		number: 87.1 + "k",
		text: "Followers",
		bg: "bg-[#e4405f]",
		hv: "hover:bg-[rgba(228,64,95,.8)]/70",
	},
	{
		id: 2,
		name: "facebook",
		icon: (
			<FaFacebook
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#4267B2]"
			/>
		),
		link: "https://www.facebook.com",
		socialLinks: "text-[#4267B2]",
		number: 649,
		text: "Followers",
		bg: "bg-[#4267B2]",
		hv: "hover:bg-[rgba(66,103,178,.8)]/70",
	},
	{
		id: 3,
		name: "twitter",
		icon: (
			<FaTwitter
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#1DA1F2]"
			/>
		),
		link: "https://twitter.com",
		socialLinks: "text-[#1DA1F2]",
		number: 23.7 + "k",
		text: "Followers",
		bg: "bg-[#1DA1F2]",
		hv: "hover:bg-[rgba(29,161,242,0.8)]/70",
	},
	{
		id: 4,
		name: "youtube",
		icon: (
			<FaYoutube
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#FF0000]"
			/>
		),
		link: "https://www.youtube.com/",
		socialLinks: "text-[#FF0000]",
		number: 25.7 + "k",
		text: "Followers",
		bg: "bg-[#FF0000]",
		hv: "hover:bg-[rgba(255,0,0,.8)]/70",
	},
	{
		id: 5,
		name: "linkedin",
		icon: (
			<FaLinkedin
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#0e76a8]"
			/>
		),
		link: "https://www.linkedin.com/",
		socialLinks: "text-[#0e76a8]",
		number: 28.7 + "k",
		text: "Followers",
		bg: "bg-[#0e76a8]",
		hv: "hover:bg-[rgba(14,118,168,.8)]",
	},
	{
		id: 6,
		name: "website",
		icon: (
			<FaRss
				className="inline-block rounded-md px-0.5  transition-all duration-200 ease-linear
			 group-hover:bg-[#ff6f00]"
			/>
		),
		link: "https://www.mywebsite.com/",
		socialLinks: "text-[#ff6f00]",
		number: 99,
		text: "Subscribers",
		bg: "bg-[#ff6f00]",
		hv: "hover:bg-[rgba(255,111,0,.8)]/70",
	},
];

export const Map = `
		<iframe 
		src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5609.90112266805!2d6.832326377011093!3d6.157652257901957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sfr!4v1670209134362!5m2!1sen!2sfr" 
		width="100%" 
		height="450" 
		style="border:0;" 
		allowfullscreen="" 
		loading="lazy" 
		referrerpolicy="no-referrer-when-downgrade"
		></iframe>`;

export const navItems = [
	{
		id: 1,
		url: "/books",
		name: "Books",
	},
	{
		id: 2,
		url: "/favorite",
		name: "Favorite",
	},
	{
		id: 3,
		url: "/lifestyle",
		name: "Lifestyle",
	},
	{
		id: 4,
		url: "/business",
		name: "Business",
	},
	{
		id: 5,
		url: "/quotes",
		name: "Quotes",
	},
];

export const ContactInfo = [
	{
		id: 1,
		icon: <FaMapMarkerAlt className="inline-block" />,
		text: "639,Longmei Avenue Jiangning Campus, Nanjing",
	},
	{
		id: 2,
		icon: <FaPhoneAlt className="inline-block" />,
		text: "(0361) 888 1234",
	},
	{
		id: 3,
		icon: <FaFax className="inline-block" />,
		text: "(0361) 888 1234",
	},
	{
		id: 4,
		icon: <FaEnvelope className="inline-block" />,
		text: "contact@yourwebsite.com",
	},
	{
		id: 5,
		icon: <FaClock className="inline-block" />,
		text: "Opening Days: Mon - Sat",
	},
];

export const otherPages = [
	{
		id: 1,
		page: "About",
		to: "about",
	},
	{
		id: 2,
		page: "Contact Us",
		to: "contact_us",
	},
	{
		id: 3,
		page: "Privacy & Policy",
		to: "privacy&policy",
	},
];

export const passWordTextStructure = [
	{
		id: 0,
		text: "8 characters minimum",
	},
	{
		id: 1,
		text: "One uppercase character",
	},
	{
		id: 2,
		text: "One lowercase character",
	},
	{
		id: 3,
		text: "One special character",
	},
	{
		id: 4,
		text: "Numbers",
	},
];
