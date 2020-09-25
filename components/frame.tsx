import React, { FC } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styles from './frame.module.scss';
import { UserStatus } from './user-status/user-status';
import { usePrimaryPath } from '../utils/utils';
import Head from 'next/head';

export type AppFrameProps = {
  hideFooter?: boolean;
};

export const AppFrame: FC<AppFrameProps> = ({ children, hideFooter }) => {
  const primaryPath = usePrimaryPath();
  return (
    <>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
          async
        />
      </Head>
      <div className={styles.rootContainer}>
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              src="/logo-h30.png"
              srcSet="/logo-h30.png 1x, /logo-h60.png 2x"
              height="30"
              alt="SYSUMSC"
            />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav activeKey={primaryPath}>
              <Nav.Item>
                <Nav.Link href="/">首页</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/journal">社刊</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/blog">博客</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/puzzle">解谜</Nav.Link>
              </Nav.Item>
            </Nav>
            <Navbar.Text className="ml-auto">
              <UserStatus />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <div className={styles.mainSection}>{children}</div>
        {!hideFooter && (
          <footer className={styles.footerSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.section}>
                <h5 className={styles.title}>联系方式</h5>
                <ul className={styles.list}>
                  <li>
                    <a href="https://jq.qq.com/?_wv=1027&k=MFjOBmdG" rel="noopener" target="_blank">
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
                    <a href="mailto:darkyzhou@sysums.club" target="_blank">
                      darkyzhou@sysums.club
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
                      <img
                        alt="logo"
                        srcSet="/logo-h60.png 1x, /logo-h120.png 2x"
                        src="/logo-h60.png"
                        className={styles.logo}
                      />
                      <div className={styles.intro}>
                        <p>由一群热爱技术的计算机爱好者</p>
                        <p>于2002年夏在中大校园正式成立</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};
