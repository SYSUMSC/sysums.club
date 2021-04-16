import React, { FC, useEffect } from 'react';
import styles from './frame.module.scss';
import { UserStatus } from './user-status/user-status';
import { usePrimaryPath } from '../utils/utils';
import Head from 'next/head';
import { Pivot, PivotItem } from '@fluentui/react';

export type AppFrameProps = {
  hideFooter?: boolean;
};

export const AppFrame: FC<AppFrameProps> = ({ children, hideFooter }) => {
  const primaryPath = usePrimaryPath();
  return (
    <>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js"
          crossOrigin="anonymous"
          async
        />
      </Head>
      <div className={styles.rootContainer}>
        <header className={styles.header}>
          <img
            className={styles.logo}
            src="/logo-h30.png"
            srcSet="/logo-h30.png 1x, /logo-h60.png 2x"
          />
          <nav className={styles.nav}>
            <Pivot
              selectedKey={primaryPath}
              onLinkClick={(item) => (window.location.href = item.props.itemKey)}
            >
              <PivotItem headerText="首页" itemKey="/" key="/" />
              <PivotItem headerText="社刊" itemKey="/journal" key="/journal" />
              <PivotItem headerText="解谜" itemKey="/puzzle" key="/puzzle" />
            </Pivot>
          </nav>
          <div className={styles.userStatus}>
            <UserStatus />
          </div>
        </header>
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
                        由一群热爱技术的计算机爱好者于 2002 年夏天在中山大学南校园创立。
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
