<script setup lang="ts"></script>

<template>
  <a-layout class="app-container">
    <a-layout-sider class="app-container__left-sider">
      <slot name="sider"></slot>
    </a-layout-sider>

    <a-layout class="app-container__right-wrapper">
      <a-layout-header class="header">
        <div class="header__title">
          <slot name="headerTitle"></slot>
        </div>

        <div class="header__actions">
          <slot name="headerActions"></slot>
        </div>

        <div class="header__bgmask"></div>
      </a-layout-header>

      <a-layout-content class="content">
        <Scrollbar class="content__with-scrollbar" style="" :auto-hide="false">
          <slot name="content"></slot>
        </Scrollbar>
      </a-layout-content>

      <!-- <a-layout-footer class="footer">
        <slot name="footer"></slot>
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.ant-layout.app-container {
  height: 100vh;
  background-color: transparent;

  .app-container__left-sider {
    padding-top: var(--drag-area-padding-top);
    line-height: 120px;
    background: rgba(255, 255, 255, 0.5);
    border-right: 1px solid var(--border-color);
  }

  .app-container__right-wrapper {
    background-color: #f2f2f2;

    .header {
      height: 64px;
      padding-inline: 50px;
      line-height: 64px;
      border-bottom: 1px solid var(--border-color);
      background: transparent;
      align-items: center;
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: var(--drag-area-padding-top) 20px 14px;

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

    .content {
      min-height: 120px;

      .content__with-scrollbar {
        padding: 0 20px;
        max-height: 100%;

        :deep(.scrollbar-content::after),
        :deep(.scrollbar-content::before) {
          padding-top: 20px;
        }
      }
    }
  }
}
</style>
