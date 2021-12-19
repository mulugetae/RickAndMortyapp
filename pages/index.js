/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'




const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  console.log('data', data);
  const { info, results: defaultResults = [] } = data;

const [results, updateResults] = useState(defaultResults);

const [page, updatePage] = useState({
  ...info,
  current: defaultEndpoint
});
const { current } = page;

useEffect(() => {
  if ( current === defaultEndpoint ) return;

  async function request() {
    const res = await fetch(current)
    const nextData = await res.json();

    updatePage({
      current,
      ...nextData.info
    });

    if ( !nextData.info?.prev ) {
      updateResults(nextData.results);
      return;
    }

    updateResults(prev => {
      return [
        ...prev,
        ...nextData.results
      ]
    });
  }

  request();
}, [current]);

const [darkTheme, setDarkTheme] = useState(undefined);

  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        // Set value of  darkmode to dark
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        // Set value of  darkmode to light
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    );
    // Set initial darkmode to light
    setDarkTheme(initialColorValue === 'dark');
  }, []);

function handleOnSubmitSearch(e) {
  e.preventDefault();

  const { currentTarget = {} } = e;
  const fields = Array.from(currentTarget?.elements);
  const fieldQuery = fields.find(field => field.name === 'query');

  const value = fieldQuery.value || '';
  const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

  updatePage({
    current: endpoint
  });
}


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
      <nav>
          <div className="mybrand"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/320px-Rick_and_Morty.svg.png" /></div>

<div className="search__container">
<form className={styles.search} onSubmit={handleOnSubmitSearch}>
    <input className="search__input" type="search" name="query" placeholder="Search"/>
    </form>
</div>

          <div>
            {darkTheme !== undefined && (
              <form action="#">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkTheme}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                </label>
              </form>
            )}
          </div>
        </nav>
        <main className={styles.main}>


<ul className="grid">
  {results.map(result => {
    const { id, name, image ,species ,status,origin,episode} = result;
    return (
      
      <li key={id} className="card">
        <div className="img-avatar">
        
  </div>
  <div className="card-text">
    <div className="portada">
    <img src={image} />
    </div>
    <div className="title-total">   
      <div className="title"><h2>{name}</h2> 
      <div className="container">
      
</div>
      </div>
            <div className="row">
          <div className="column" >
            <h3>Origin</h3>
            <p>{origin.name}</p>
          </div>
          <div className="column" >
            <h3>Species</h3>
            <p>{species}</p>
          </div>
        </div>
          <div className="actions">
            <button><a href="#demo-modal">See Epsode</a></button>
          </div>
  </div>
 
  </div>
  
 
      </li>
      
      
    )
  })}
   
</ul>
<div id="demo-modal" className="modal">
    <div className="modal__content">
        <h1></h1>

        <p>
        </p>

        <div className="modal__footer">
         <i className="fa fa-heart"></i>, 
        </div>

        <a href="#" className="modal__close">&times;</a>
    </div>
    </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
    </div>
  )
}
