import React from 'react';
import { Icon } from 'antd';

export default function Footer() {
  const copyright = '2019 袋鼠云技术部出品';
  return (
    <footer className="yux-footer">
      {copyright && <div className="copyright"><Icon type="copyright" />&nbsp;Copyright {copyright}</div>}
    </footer>
  );
}

