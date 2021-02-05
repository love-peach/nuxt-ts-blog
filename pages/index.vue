<template>
  <div class="page">
    <BillBoard poster-blue="0" height="100vh" sticky is-home-page poster="https://picsum.photos/1080/300?image=223">
      <div class="page-slogan">做一枚 <RotatingText :words="words" width="2em" /> 的前端</div>
      <div class="page-slogan-sub">To be a <RotatingText :words="words2" width="3.8em" /> front-end developer</div>
      <div class="banner-btn-wrap">
        <Btn theme="success" shape="circle" size="large" class="banner-btn" icon="github" @click="handleGoGithub">Coding</Btn>
        <Btn shape="circle" size="large" ghost class="banner-btn" :to="{ path: '/article' }">进入博客</Btn>
      </div>
    </BillBoard>
    <div class="page-content">
      <section class="section-part section-part-module">
        <section-title title="WEB OVERVIEW" title-sub="网站模块介绍" desc="主要介绍网站各个模块用到了那些技术"></section-title>

        <div class="z-container">
          <div class="z-row">
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-20">
              <section-card title="前端文章" icon="artical" path="/article">
                <div>
                  采用 Nuxt.js 实现一套 ssr 博客系统，支持 md 边写作边预览。
                </div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-20">
              <section-card title="前端资源" icon="link" theme="info" path="/resource">
                <div>
                  前端添加资源链接，后台通过 puppeteer 截取网站屏幕，上传 ali-oss 阿里云。
                </div>
              </section-card>
            </div>
            <div class="z-col-sm-30 z-col-md-30 z-col-lg-20">
              <section-card title="后台管理" icon="admin" theme="error" path="/admin">
                <div>
                  采用 node.js 的 koa 开发框架, 搭建整个后台项目，采用 mogodb 作为数据库。pm2 管理 node 进程
                </div>
              </section-card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
}
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
.page-slogan {
  font-size: 36px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #fff;
}
.page-slogan-sub {
  font-size: 26px;
  color: #fff;
}
.banner-btn-wrap {
  margin-top: 30px;
  margin-bottom: 20px;
}
.banner-btn {
  width: 200px;
  padding: 7px 15px;
  font-size: 18px;
  margin: 20px 20px 0;
}
.section-part {
  // background-color: #fafafa;
  min-height: 300px;
  padding: 40px 20px 50px;
  // border: 1px solid #ccc;
}
.section-part-module {
}

.section-part-profile {
  position: relative;
  background-color: #333;
  background-image: url(~assets/img/home/bg1.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .section-part-profile-container {
    max-width: 900px;
  }
  .section-profile-avatar-wrap {
    text-align: center;
    // border: 1px solid @colorWarning;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
  }
  .section-profile-avatar {
    height: 100px;
    width: 100px;
    border-radius: 100px;
    margin: 0 auto;
  }

  .section-profile-info {
    // border: 1px solid @colorWarning;
    margin-top: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;

    li {
      list-style: none;
      padding: 8px 10px 8px 8px;
      text-align: right;
      color: #fff;
      span {
        font-size: 16px;
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }
      i {
        line-height: 1;
        vertical-align: baseline;
      }
    }
    li + li {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
  .section-profile-name-wrap {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 29px 15px;
    .section-profile-name {
      font-size: 26px;
      color: #fff;
      line-height: 1;
      font-weight: bold;
    }
    .section-profile-name-en {
      display: inline-block;

      padding-bottom: 6px;
      margin-top: 10px;
      margin-bottom: 3px;
      font-size: 17px;
      color: #ccc;
      line-height: 1;
    }
  }
  .section-profile-desc-wrap {
    margin-top: 16px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 15px 15px 55px;
    .section-profile-desc {
      color: #f1f1f1;
      font-size: 15px;
      line-height: 1.7;
      text-align: justify;
    }
    .section-profile-desc-en {
      margin-top: 30px;
      color: #f1f1f1;
      font-size: 12px;
    }
  }
}
.section-part-career {
}
.section-part-project {
  background-color: #333;
  position: relative;
  background-color: #333;
  background-image: url(~assets/img/home/bg2.jpg);
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.section-part-module-btn {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
}

.section-project-content {
  position: relative;
  padding-top: 61.8%;
  overflow: hidden;

  .section-project-poster {
    background-size: cover;
    position: absolute;

    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0);
      transition: all ease 0.3s;
    }
  }
  .section-project-info {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all ease 0.3s;
  }
  .section-project-name {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }
  .section-project-desc {
    margin-top: 20px;
    padding: 10px;
    color: #fff;
    width: 100%;
  }
}
.section-project-content:hover {
  .section-project-info {
    top: 0;
    opacity: 1;
  }
}
.contact-list {
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
  .contact-list-item {
    float: left;
    width: 25%;
    list-style: none;
    text-align: center;
  }
  .contact-list-item-link {
    position: relative;
    height: 100px;
    width: 100px;
    border-radius: 100px;
    display: inline-block;
    border: 1px solid @colorTextDisable;
  }
  .contact-list-item-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .contact-list-item-link-github {
    &:hover {
      background-color: #24292e;
      color: #fff;
    }
  }
  .contact-list-item-link-juejin {
    &:hover {
      background-color: #3780f7;
      color: #fff;
    }
  }
  .contact-list-item-link-sf {
    &:hover {
      background-color: #009a61;
      color: #fff;
    }
    .contact-list-item-icon {
      transform: translate(-50%, -60%);
    }
  }
  .contact-list-item-link-npm {
    &:hover {
      background-color: #cb3837;
      color: #fff;
    }
  }
}
</style>
