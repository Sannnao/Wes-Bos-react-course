import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Nav } from '.';
import NProgress from 'nprogress';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.red};
    color: white;
    text-transform: uppercase;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 10px solid ${(props) => props.theme.lightGrey};
  }
`;

export const Header = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      NProgress.start()
      console.log('on route change start', url);
    };
    const hadnleRouteChangeComplete = (url) => {
      NProgress.done()
      console.log('on route change complete', url);
    };
    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        NProgress.done()
        console.log(`Route to ${url} was cancelled!`);
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', hadnleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', hadnleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>sick-fits</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </StyledHeader>
  );
};
