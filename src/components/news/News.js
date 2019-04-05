import React from 'react';

const getImageUrl = (obj) =>{

  if(!obj){
    return 'http://www.mzformativa.com/sites/default/images/default.png';
  }else {
    return Object.values(obj)[0].url;
  }
}


const News = ({data}) => {

  return (
    <>
    {data.map(item => (
      <div className="news" key={item.guid}>
      <div className="block-date">
          <p>Publication:{item.pubDate.slice(0,-3)}</p>
      </div>
      <div className="block-image"> 
         <a href={item.link} target="_blank" className="news__image"><img src={getImageUrl(item['media:content'])}  className="news__image" /></a>
      </div>
      <div className="block-title">
        <a href={item.link} target="_blank"><h2 className="news__title">{item.title}</h2></a>
      </div>
      <div className="block-description"> 
        <p className="news__description"  dangerouslySetInnerHTML={{ __html: item.description}}/>
      </div>
      <div className="block-owner">
        <p className="news__owner"><a href={item.link} target="_blank">News owner: {item.source} </a></p>
      </div>
    </div>
    ))}
    </>
  );
}

export default News;