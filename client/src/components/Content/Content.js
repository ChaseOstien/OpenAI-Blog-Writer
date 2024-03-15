import '../../App.css';
import Moment from 'react-moment';

export default function Content({ blogContent, blogTitle, blogGenerated }) {

    return (
        blogContent ? ( 
            <div id="content" className="w-4/5 mx-auto p-4 bg-darkGreyOpaque rounded-lg overflow-y-auto h-4/5 accent-inherit">
                <h2 className='text-onBackground mb-3 font-extrabold font-robotoRegular'>
                    {blogTitle}
                </h2>
                {blogContent.split('\n\n').map((paragraph, index) => (
                    <p className='text-onBackground p-2 font-robotoRegular' key={index}>{paragraph}</p>
                ))}
                {blogGenerated ? 
                    <Moment format='MMMM DD, YYYY'
                    className='text-onBackground 
                        mt-3 
                            font-extrabold font-robotoRegular'>
                        {blogGenerated}
                    </Moment> 
                        : 
                        null}
            </div> ) : (
        <div id="content" className="flex flex-col items-center justify-center w-4/5 mx-auto p-4 bg-darkGreyOpaque rounded-lg overflow-y-auto h-4/5 accent-inherit text-onBackground">
            <h1 id="title" className='font-bold text-3xl mb-4 font-robotoRegular '>
                Blog Content Generator
            </h1>
            <h3 className='w-2/3 text-wrap text-md font-robotoRegular'>
                This content generator utilizes the OpenAI API to draft blog content based on user input. The system has been primed to serve as a skilled blog writer that writes engaging and helpful posts. It will return content structured in the same format, including a title, sections and line breaks.
            </h3>
            <h3 className='mt-3 font-semibold font-robotoRegular'>
                To use this content generator simply enter a prompt below and click generate!
            </h3>
            <br />
            <ul className='list-disc'>
                <h3 className='font-semibold mb-1 font-robotoRegular'>Example prompts:</h3>
                    <li className='p-1 font-sm font-robotoRegular'>
                        Write a blog on the importance of building a good credit score.
                    </li>
                    <li className='p-1 font-sm font-robotoRegular'>
                        Write a blog that covers effective strategies for managing work related stress.
                    </li>
                    <li className='p-1 font-sm font-robotoRegular'>
                    Write a blog on the importance of your credit score in determining interest rates.
                    </li>
                    <li className='p-1 font-sm font-robotoRegular'>
                        Write a blog that explains fractions and uses examples to support the content.
                    </li>
                </ul>
        </div> )
    )
}
