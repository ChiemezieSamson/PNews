import React from 'react'
import { NavDirectionAndPageName } from '../../SharedAsset/SharedAssets'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  return (
    <div className='text-left mb-32'>
       <NavDirectionAndPageName page={"Terms of Service"} />

       <article className='mt-12 xl:max-w-[60%] prose-lg'>

        <p>
          <strong>Pnews Terms of Service</strong>
          <br />
          Welcome to Pnews. By accessing and using our website <Link to={"/"}>(pnews.com)</Link> and any associated services, 
          you agree to be bound by the following terms and conditions <Link to={"/termsofservice"}>("Terms of Service")</Link>. Please read them carefully.
        </p>

        <p>
          <strong>Use of the Website</strong>
          <br />
          The content on the Pnews website, including but not limited to news articles, blogs, videos, and images, is provided for informational and educational purposes only. 
          You may view, download, and print content from the website for personal, non-commercial use only.
        </p>

        <p>
          <strong>Intellectual Property Rights</strong>
          <br />
          All content on the Pnews website, including but not limited to text, graphics, logos, images, and software, is the property of Pnews or its licensors and is 
          protected by applicable intellectual property laws. Except as expressly permitted, you may not modify, copy, reproduce, republish, upload, post, transmit, 
          or distribute any content from the website without prior written consent from Pnews.
        </p>

        <p>
          <strong>User Conduct</strong>
          <br />
          You agree to use the Pnews website and its services in accordance with all applicable laws and regulations. You shall not engage in any conduct that may be 
          considered illegal, harmful, threatening, abusive, defamatory, obscene, or invasive of another's privacy.
        </p>

        <p>
          <strong>Third-Party Links</strong>
          <br />
          The Pnews website may contain links to third-party websites or resources. Pnews is not responsible for the content, accuracy, or policies of these external 
          sites, and any use of such third-party resources is at your own risk.
        </p>

        <p>
          <strong>Disclaimer of Warranties</strong>
          The Pnews website and its content are provided "as is" without any warranties, express or implied. Pnews does not guarantee the accuracy, completeness, 
          or timeliness of the information provided on the website.
        </p>

        <p>
          <strong>Limitation of Liability</strong>
          <br />
          Pnews shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of or inability to use the 
          website or its services, including but not limited to damages for loss of profits, data, or other intangible losses.
        </p>

        <p>
          <strong>Modifications to the Terms of Service</strong>
          <br />
          Pnews reserves the right to modify or update these Terms of Service at any time without prior notice. Your continued use of the website after any 
          modifications constitutes your acceptance of the revised Terms of Service.
        </p>

        <p>
          <strong>Governing Law</strong>
          These Terms of Service shall be governed by and construed in accordance with the laws of ...
        </p>

        <p>
          By using the Pnews website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
        </p>
       </article>
      
    </div>
  )
}

export default TermsOfService
