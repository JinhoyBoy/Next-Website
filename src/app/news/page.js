"use client";
import { useEffect, useState } from 'react';
import styles from "../page.module.css";
import Navbar from '../navbar.js';
import Footer from '../footer.js';
import Link from 'next/link';

const fetchRSSFeed = async (url) => {
  const response = await fetch(`/api/rss?feedUrl=${encodeURIComponent(url)}`, {cache: 'no-store'});
  const data = await response.json();
  return data;
};

const parseRSS = (data) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const items = xmlDoc.getElementsByTagName('item');
  const parsedItems = [];

  for (let i = 0; i < Math.min(items.length, 10); i++) {
    const item = items[i];
    const title = item.getElementsByTagName('title')[0]?.textContent || 'No title';
    const link = item.getElementsByTagName('link')[0]?.textContent || '#';
    const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || 'No date';
    const description = item.getElementsByTagName('description')[0]?.textContent || 'No description';

    const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];
    const mediaContent = item.getElementsByTagName('media:content')[0];
    const image = mediaThumbnail ? mediaThumbnail.getAttribute('url') : 
                   mediaContent ? mediaContent.getAttribute('url') : null;

    parsedItems.push({ title, link, pubDate, description, image });
  }

  return parsedItems;
};

const News = () => {
  const [bbcNews, setBbcNews] = useState([]);
  const [nytNews, setNytNews] = useState([]);

  useEffect(() => {
    const fetchBbcNews = async () => {
      try {
        const data = await fetchRSSFeed('http://feeds.bbci.co.uk/news/rss.xml');
        if (data) {
          const parsedData = parseRSS(data);
          setBbcNews(parsedData);
        }
      } catch (error) {
        console.error('Error fetching or parsing BBC News RSS feed:', error);
      }
    };

    const fetchNytNews = async () => {
      try {
        const data = await fetchRSSFeed('https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml');
        if (data) {
          const parsedData = parseRSS(data);
          setNytNews(parsedData);
        }
      } catch (error) {
        console.error('Error fetching or parsing New York Times RSS feed:', error);
      }
    };

    fetchBbcNews();
    fetchNytNews();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "20vh" }}></div>
      <div className={styles.weatherHead}>
        <h1>News!</h1>
        <br />
        <p>Top 10 News from BBC News & New York Times Technology.</p>
      </div>

      <div style={{ padding: '5%' }}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>BBC News</h2>
        {bbcNews.map((item, index) => (
          <div key={index} className={styles.newsItem}>
            <div style={{paddingRight: '5%'}}>
              <h2>{item.title}</h2>
              <p>{item.pubDate}</p>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
            <div className={styles.newsImage}>
              {item.image && <img src={item.image} alt={item.title} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '5%' }}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>New York Times Technology</h2>
        {nytNews.map((item, index) => (
          <div key={index} className={styles.newsItem}>
            <div style={{paddingRight: '5%'}}>
              <h2>{item.title}</h2>
              <p>{item.pubDate}</p>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
            <div className={styles.newsImage}>
              {item.image && <img src={item.image} alt={item.title} />}
            </div>
          </div>
        ))}
      </div>

      <Link href="/">
        <h3 style={{ textAlign: "center", paddingBottom: "30px", textDecoration: "underline", color: "#898989" }}>Back to home</h3>
      </Link>
      <Footer />
    </>
  );
};

export default News;
