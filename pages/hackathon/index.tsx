import { AppFrame } from '../../components/frame';
import Head from 'next/head';
import React from 'react';
import { ActionButton, FontIcon } from '@fluentui/react';
import { LearnIcon } from '../../components/icons/LearnIcon';
import { MoneyIcon } from '../../components/icons/MoneyIcon';
import { CertificateIcon } from '../../components/icons/CertificateIcon';
import { FoodIcon } from '../../components/icons/FoodIcon';
import styles from './index.module.scss';
import Slider from 'react-slick';
import { CalendarIcon } from '../../components/icons/CalendarIcon';

const CAROUSEL_IMAGE_URLS = [
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/hackathon.png',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/hackathon-1.jpg',
  'https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/hackathon-2.jpg'
];

export default function HackathonIndexPage() {
  return (
    <AppFrame>
      <Head>
        <title>2021“智慧校园”黑客马拉松 · SYSUMSC</title>
      </Head>
      <div className="flex-grow">
        <div className="relative">
          <Slider
            dots={false}
            arrows={false}
            infinite={true}
            speed={800}
            slidesToShow={1}
            autoplay={true}
            autoplaySpeed={3500}
            className={styles.carousel}
          >
            {CAROUSEL_IMAGE_URLS.map((url) => (
              <img className={styles.carouselImage} key={url} src={url} />
            ))}
          </Slider>
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'rgba(0, 0, 0, 0.25) linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 50%)'
            }}
          />
          <div className="z-10 absolute inset-x-0 bottom-0 px-4 py-2 md:px-8 md:py-4">
            <h2 className="text-white font-bold text-2xl md:text-4xl mb-4 tracking-wider">
              欢迎参加 2021 “智慧校园” 黑客马拉松
            </h2>
            <p className="text-white mb-1 flex items-center text-sm md:text-xl">
              <span className="pt-1 pr-1">
                由中山大学 MS 俱乐部和华南理工大学微软俱乐部联合举办
              </span>
              <ActionButton>
                <span style={{ color: '#2380d0' }} className="text-sm md:text-xl">
                  <a style={{ color: '#2380d0' }} target="_blank" href="/hackathon/signup">
                    跳转到报名页面
                  </a>
                  <FontIcon iconName="ArrowUpRight" />
                </span>
              </ActionButton>
            </p>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">
                黑客马拉松，<strong>是什么？</strong>
              </h2>
              <p className="leading-7 font-light px-4 py-2">
                黑客马拉松，简称"黑客松"，英文名为 Hackathon。
                它是极客们聚在一起分享经验、交流技术和迸发灵感的盛会。
                它既是一次史无前例的挑战，也是一场无与伦比的冒险，极客们需要在短短的 48
                小时内将自己的奇思妙想落地，使用双手敲击键盘打造出自己梦想中的软件项目。
                最后在评比环节中打败其他对手，证明自己。
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl mb-2 text-center md:text-left">
                参加黑客马拉松，<strong>我将收获什么？</strong>
              </h2>
              <div
                className="leading-7 grid gap-4 break-all"
                style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
              >
                <div className="flex flex-col items-center px-4 py-2">
                  <div className="w-20 h-20">
                    <LearnIcon />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-center text-xl mb-4">技术提升</h4>
                    <p className="font-light leading-6">
                      经历头脑风暴，展现无尽才华、锻炼自身能力。 比赛前还会有各路高手帮助解答疑惑。
                      除此外还有华工与中大的教授讲解，以及企业评委的点评。
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-4 py-2">
                  <div className="w-20 h-20">
                    <MoneyIcon />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-center text-xl mb-4">丰富奖品</h4>
                    <p className="font-light leading-6">
                      冠军将获得 1024 元奖金。 亚、季军将获得 512 元奖金。 而第四至七名则将获得 256
                      元奖金。 所有参赛者都将获得精心准备的微软周边。
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-4 py-2">
                  <div className="w-20 h-20">
                    <CertificateIcon />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-center text-xl mb-4">综测加分</h4>
                    <p className="font-light leading-6">
                      黑客马拉松是由中山大学 MS 俱乐部和华南理工大学微软俱乐部联合举办的校级比赛，
                      比赛的优胜者将获得学校的综测加分。
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center px-4 py-2">
                  <div className="w-20 h-20">
                    <FoodIcon />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-center text-xl mb-4">零食饮品</h4>
                    <p className="font-light leading-6">
                      比赛现场提供足量零食饮品，助力灵感迸发，尽情享受比赛。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">
                好像还不错，<strong>参赛有什么要求呢？</strong>
              </h2>
              <p className="leading-7 font-light px-4 py-2">
                无论你是大一，大二还是大三的同学，只要拥有对于编程的激情，对于提升编程能力的渴望，那么黑客松将是你不可错失的机会。
                你只需要在灵感、代码、开发、测试、文案、视频、演讲等中，找到你最擅长的方面。
                同时，在黑客松那丰富灵活的选题规则中，任由你挑选自己最感兴趣的一个。
                再拉上几个志同道合的伙伴，相信你总能在团队中找到属于自己的位置！
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">
                黑客马拉松的<strong>赛程安排是？</strong>
              </h2>
              <div className="leading-7 font-light px-4 py-2">
                <div>
                  <h4>
                    <span className="font-normal">报名征集</span>
                    <span className="pl-2">
                      <CalendarIcon />
                      2021.5.9 ~ 2021.5.21
                    </span>
                  </h4>
                  <p className="pl-2">
                    本次活动面向中山大学与华南理工大学<strong>所有的本科生与研究生</strong>。
                    选手自由组队报名，每个小队限 2 至 5 人。然后
                    <a target="_blank" href="/hackathon/signup">
                      填写报名表单
                    </a>
                    。
                  </p>
                </div>
                <div>
                  <h4>
                    <span className="font-normal">技术讲座</span>
                    <span className="pl-2">
                      <CalendarIcon />
                      2021.5.16
                    </span>
                  </h4>
                  <p className="pl-2">
                    由中大 MS 俱乐部前主席贺恩泽、前副主席傅禹泽开展黑客松技术宣讲，主题包括：
                    <ul className="list-inside list-disc">
                      <li>微软都有哪些开源项目</li>
                      <li>如何为微软的开源项目贡献代码</li>
                      <li>利用微软Azure云服务的各项功能来提高开发效率的方法</li>
                    </ul>
                    届时，技术讲座还将公布<strong>本次黑客松的比赛主题</strong>。
                  </p>
                </div>
                <div>
                  <h4>
                    <span className="font-normal">比赛开始</span>
                    <span className="pl-2">
                      <CalendarIcon />
                      2021.5.21 14:00 ~ 2021.5.23 14:00
                    </span>
                  </h4>
                  <p className="pl-2">
                    参赛队伍选定题目，利用相应材料<strong>在 48 小时内完成项目的开发</strong>
                    。比赛提供实验室线下场地，提供零食饮品，选手也可选择线上参赛。
                  </p>
                </div>
                <div>
                  <h4>
                    <span className="font-normal">项目展示</span>
                    <span className="pl-2">
                      <CalendarIcon />
                      2021.5.23 14:00 ~ 2021.5.23 17:00
                    </span>
                  </h4>
                  <p className="pl-2">参赛队伍展示完成的项目，并进行线上评分。</p>
                </div>
                <div>
                  <h4>
                    <span className="font-normal">颁奖典礼</span>
                    <span className="pl-2">
                      <CalendarIcon />
                      2021.5.23 17:00 ~ 18:00
                    </span>
                  </h4>
                  <p className="pl-2">进行颁奖典礼，最后进行闭幕式。</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">
                我还有一些<strong>疑问</strong>......
              </h2>
              <div className="leading-7 font-light px-4 py-2">
                <p>
                  Q：我是大一学生，编程背景不深，能参加比赛吗?
                  <br />
                  A：当然可以。黑客松是创意与激情的竞技场，比赛现场的工作人员随时可以提供技术指导，帮助你在好想法到好项目之间构筑桥梁。
                </p>
                <p>
                  Q：比赛具体会以怎么样的形式开展呢?
                  <br />
                  A：两所大学都会提供线下会场，提供零食饮品为选手补充能量。比赛形式自由，选手们也可以选择线上签到。最终的产品展示也采用线上评审形式。
                </p>
                <p>
                  Q：线上比赛应该如何保证比赛的公平性呢?
                  <br />
                  A：组委会将设立公平监察机制，通过对源码进行审查、高效老师与企业技术人员提问等方式尽力保证比赛的公平性。同时我们保证源码不会用于其他用途。
                </p>
              </div>
            </div>
          </div>
          <div className={'w-full flex justify-center py-8 px-4 text-white ' + styles.greenSection}>
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">
                我想来试试，<strong>如何报名参赛呢？</strong>
              </h2>
              <div className="leading-7 font-light px-4 py-2">
                <p>扫描下方二维码进入交流 QQ 群，关注群公告以及管理员的通知：</p>
                <p>
                  <img
                    className="block w-36"
                    src="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/hackathon-qq.jpg"
                  />
                </p>
                <p className="mb-0">或是手动输入 QQ 群号码申请进群：736728870。</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center py-8 px-4">
            <div className="max-w-2xl w-full">
              <h2 className="text-2xl md:text-3xl text-center md:text-left">比赛举办单位</h2>
              <div className="leading-7 font-light px-4 py-4 flex">
                <div className="mr-12">
                  <img className="block max-w-36" src="/logo-h120.png" />
                </div>
                <div>
                  <img
                    className="max-h-36 block"
                    src="https://sysumsc-website.oss-cn-shenzhen.aliyuncs.com/website-resource/scutmsc.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}
