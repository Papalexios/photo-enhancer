import React from 'react';

const footerLinks = {
    'AI & Content Creation': [
        { title: 'Discover the Power of ChatGPT', url: 'https://affiliatemarketingforsuccess.com/ai/discover-the-power-of-chatgpt/' },
        { title: 'What is AI Prompt Engineering?', url: 'https://affiliatemarketingforsuccess.com/ai/what-is-ai-prompt-engineering/' },
        { title: 'The Power of Large Language Models', url: 'https://affiliatemarketingforsuccess.com/ai/the-power-of-large-language-models/' },
        { title: 'How a Winning Content Strategy Converts', url: 'https://affiliatemarketingforsuccess.com/blogging/winning-content-strategy/' },
    ],
    'SEO & Growth': [
        { title: 'Benefits of an Effective SEO Strategy', url: 'https://affiliatemarketingforsuccess.com/seo/benefits-of-an-effective-seo-strategy/' },
        { title: 'How to Write a High-Ranking Blog Post', url: 'https://affiliatemarketingforsuccess.com/blogging/how-to-write-a-high-ranking-blog-post/' },
        { title: 'Update Old Blog Content for More Traffic', url: 'https://affiliatemarketingforsuccess.com/blogging/update-old-blog-content/' },
        { title: 'Promote Your Blog to Increase Traffic', url: 'https://affiliatemarketingforsuccess.com/blogging/promote-your-blog-to-increase-traffic/' },
    ],
    'Affiliate Success': [
        { title: 'Beginner\'s Guide to Affiliate Marketing', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/beginners-guide-to-affiliate-marketing/' },
        { title: 'High Ticket Affiliate Marketing Explained', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/high-ticket-affiliate-marketing/' },
        { title: 'Why Affiliate Marketing is the Best Business Model', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/discover-why-affiliate-marketing-is-the-best-business-model/' },
        { title: 'Join The Best Affiliate Networks', url: 'https://affiliatemarketingforsuccess.com/affiliate-marketing/join-the-best-affiliate-networks/' },
    ]
}

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950/50 border-t border-slate-800 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
                 <h2 className="text-base font-bold text-slate-100">
                    <a href="https://affiliatemarketingforsuccess.com" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                        AffiliateMarketingForSuccess.com
                    </a>
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                    Your expert guide to mastering affiliate marketing, SEO, and AI-powered content creation for online success.
                </p>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                    <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">{category}</h3>
                    <ul className="mt-4 space-y-3">
                        {links.map(link => (
                            <li key={link.title}>
                                <a 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-slate-400 hover:text-violet-400 transition-colors duration-200"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} affiliatemarketingforsuccess.com. All Rights Reserved. This tool is for promotional purposes.</p>
        </div>
      </div>
    </footer>
  );
};