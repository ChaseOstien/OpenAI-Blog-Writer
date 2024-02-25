import '../../App.css';

export default function Content({ blogContent, blogTitle, blogGenerated }) {


    return (
        <div className="w-4/5 mx-auto p-4 bg-darkGreyOpaque rounded-lg overflow-y-auto h-4/5">
            <h2 className='text-onBackground mb-3 font-bold'>
                {blogTitle}
            </h2>
            {blogContent.split('\n\n').map((paragraph, index) => (
                <p className='text-onBackground p-2' key={index}>{paragraph}</p>
            ))}
            <p className='text-onBackground mt-3 font-bold'>{blogGenerated ? blogGenerated : null}</p>
        </div>
    )
}
