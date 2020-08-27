import React, { FC } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { usePrimaryPath } from '../utils/use-primary-path';
import styles from './frame.module.scss';

export const AppFrame: FC = ({ children }) => {
  const primaryPath = usePrimaryPath();
  return (
    <div className={styles.rootContainer}>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="logo-small.png"
            height="30"
            className="d-inline-block align-top"
            alt="SYSUMSC"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="justify-content-end" activeKey={primaryPath}>
            <Nav.Item>
              <Nav.Link href="/">首页</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/blog">博客</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/game">解密</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.mainSection}>{children}</div>
      <footer className={styles.footerSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.section}>
            <h5 className={styles.title}>联系方式</h5>
            <ul className={styles.list}>
              <li>
                <a href="https://jq.qq.com/?_wv=1027&k=5vLnXPJ" rel="noopener" target="_blank">
                  迎新群
                </a>
              </li>
              <li>
                <a
                  href="https://mp.weixin.qq.com/s/jBrrgkhmDRwZdyl_JikW4A"
                  rel="noopener"
                  target="_blank"
                >
                  微信公众号
                </a>
              </li>
              <li>
                <a href="mailto:admin@sysums.club" target="_blank">
                  admin@sysums.club
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.section}>
            <h5 className={styles.title}>相关链接</h5>
            <ul className={styles.list}>
              <li>
                <a href="https://studentclub.msra.cn/" target="_blank" rel="noopener">
                  微软学生俱乐部
                </a>
              </li>
              <li>
                <a href="https://github.com/SYSUMSC/" target="_blank" rel="noopener">
                  github.com/SYSUMSC
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.section}>
            <h5 className={styles.title}>关于我们</h5>
            <ul className={styles.list}>
              <li>
                <div className={styles.logoContainer}>
                  <img alt="logo" src="logo.png" className={styles.logo} />
                  <div className={styles.intro}>
                    <p>予力众生，成就不凡。</p>
                    <p>我们是中山大学微软俱乐部。</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
