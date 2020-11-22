import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const NAV_ITEMS = ['Items', 'Sell', 'Signup', 'Orders', 'Me'];

export const Nav = () => {
  return (
    <NavStyles>
      {NAV_ITEMS.map((item, i) => {
        const linkPath = `/${item.toLowerCase()}`;

        return (
          <Link key={i} href={linkPath}>
            <a>{item}</a>
          </Link>
        );
      })}
    </NavStyles>
  );
};
