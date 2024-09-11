<template>
    <nav class="navbar navbar-expand-md bg-success-subtle">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img
                    src="/favicon.png"
                    alt="Logo"
                    width="30"
                    height="30"
                    class="d-inline-block align-text-top" />
                FDFZ城定社
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/events" class="nav-link" active-class="active"
                            >活动列表</RouterLink
                        >
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/me" class="nav-link" active-class="active"
                            >个人主页</RouterLink
                        >
                    </li>
                </ul>
                <div class="d-flex">
                    <RouterLink to="/match" class="me-3 nav-link text-primary" active-class="active"
                        >进入比赛</RouterLink
                    >
                </div>
            </div>
        </div>
    </nav>

    <div class="container">
        <RouterView />
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
