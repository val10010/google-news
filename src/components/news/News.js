import React, {Components} from 'react';


const News = ({data}) => {
console.log(data);

  return (
    <>
    {data.map(item => (
      <div className="news" key={item.guid}>
      <div className="block-date">
          <p>publication:{item.pubDate.slice(0,-3)}</p>
      </div>
      <div className="block-image"> 
          <img src="http://www.mzformativa.com/sites/default/images/default.png"  className="news__image" />
      </div>
      <div className="block-title">
        <h2 className="news__title">{item.title}</h2>
      </div>
      <div className="block-description"> 
        <p className="news__description"  dangerouslySetInnerHTML={{ __html: item.description}}/>
      </div>
      <div className="block-owner">
        <p className="news__owner"><a href={item.link} target="_blank">News owner </a></p>
      </div>
    </div>
    ))}
    </>
  );
}

export default News;