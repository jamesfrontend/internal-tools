import  React from 'react';

export const MainHeader = ({
    data
}) => {

  return (
    <div className='msk-header'>
    <a className='msk--skip-to-content' href={'/'} tabIndex={0}>
        Skip to main content
    </a>
    <div className='msk-header-container'>
        <div className='msk-header-content'>
        <div className='msk-header-product'>
            <a href={'/'} className='msk-header-product-link bx--link'>
                <span className='msk-header-product-name'>Internal Tools</span>
            </a>
        </div>
        <div className='msk-header-app-menu'>
        <ul className='msk-header-app-nav'>
        {data?.map((item, index) => {
                    const navigationClass = `msk-header-app-nav-item bx--link${
                        item?.active ? ' active' : ''
                    }`;
                    return (
                        <li key={index}>
                            <a className={navigationClass} href={item.href}>
                                <span className='msk-header-app-nav-item-text'>
                                    {item.label}
                                </span>
                            </a>
                        </li>
                    );
                })}
        </ul>
        </div>
            
        </div>
    </div>
</div>
  );
};
