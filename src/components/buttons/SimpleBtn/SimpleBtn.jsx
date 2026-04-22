import React from 'react';
import './simpleBtn.css';

const SimpleBtn = ({
  children,
  fill,
  className,
  onClick,
  href,
  download,
  target,
  type = 'button',
  ...rest
}) => {
  const classes = `${fill ? 'simple_btn_fill' : 'simple_btn'} ${className || ''}`;

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        {...rest}
      >
        <span className="simple_btn_label">{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      <span className="simple_btn_label">{children}</span>
    </button>
  );
};

export default SimpleBtn;
