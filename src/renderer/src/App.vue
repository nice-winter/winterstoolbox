<script setup lang="ts">
onBeforeMount(async () => {
  const hwinfo = await window.api.hwinfo()
  console.log(hwinfo)
})
</script>

<template>
  <a-app>
    <WindowControlMenu />

    <a-layout class="app-container">
      <a-layout-sider class="left-sider">Sider</a-layout-sider>

      <a-layout class="right-wrapper">
        <a-layout-header class="header">
          <div class="header__title">
            <a-typography-title :level="5" style="margin-bottom: 0">
              这是一个不得了的标题
            </a-typography-title>
          </div>
          <div class="header__actions"></div>

          <div class="header__bgmask"></div>
          <!-- <div>
            <i class="iconfont tuichu"></i>
          </div> -->
        </a-layout-header>

        <a-layout-content class="container">
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component"></component>
            </KeepAlive>
          </RouterView>
        </a-layout-content>
        <!-- <a-layout-footer :style="footerStyle">Footer</a-layout-footer> -->
      </a-layout>
    </a-layout>
  </a-app>
</template>

<style lang="less" scoped>
.ant-layout {
  background-color: transparent;
}

.app-container {
  height: 100vh;

  .left-sider {
    text-align: center;
    padding-top: 64px;
    line-height: 120px;
    background: rgba(255, 255, 255, 0.5);
    border-right: 1px solid #e9e9e9;
  }

  .right-wrapper {
    background-color: #f2f2f2;

    .header {
      text-align: center;

      height: 64px;
      padding-inline: 50px;
      line-height: 64px;
      border-bottom: 1px solid #e9e9e9;
      background: transparent;
      align-items: center;
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 28px 20px 14px;

      .header__title {
        align-items: center;
        display: flex;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        margin-right: 16px;
        font-size: 20px;
        line-height: 26px;
      }

      .header__actions {
        -webkit-app-region: no-drag;
      }

      .header__bgmask {
        bottom: 0.5px;
        left: 0px;
        pointer-events: none;
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }

    .container {
      text-align: center;
      min-height: 120;
      line-height: 120px;
    }
  }
}
</style>
