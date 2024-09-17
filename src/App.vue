<template>
    <header>
        <nav class="navbar navbar-expand-sm bg-info-subtle">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img
                        src="/favicon.webp"
                        width="30"
                        height="30"
                        class="d-inline-block align-text-top" />
                    FDFZ城市定向社
                </a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar">
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </button>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link" active-class="active"
                                >首页</RouterLink
                            >
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
                        <RouterLink
                            to="/match"
                            class="me-3 nav-link text-primary"
                            active-class="active"
                            >进入比赛</RouterLink
                        >
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main class="flex-shrink-0">
        <div class="container">
            <RouterView />
        </div>
    </main>

    <footer class="d-flex justify-content-between mt-5 py-2 border-top border-primary-subtle">
        <p class="text-secondary ms-1 ms-sm-3">
            Made with
            <FontAwesomeIcon class="text-danger" beat icon="fa-solid fa-heart" size="lg" /> by Team
            FDFZ CityRush
        </p>
        <div class="me-1 me-sm-3 d-flex">
            <a href="https://github.com/jeremy0519/cityrush" target="_blank" class="text-reset"
                ><FontAwesomeIcon
                    style="cursor: pointer"
                    class="me-1"
                    icon="fa-brands fa-github"
                    size="lg"
            /></a>

            <RouterLink to="/status" class="text-secondary nav-link">Status</RouterLink>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'
</script>
