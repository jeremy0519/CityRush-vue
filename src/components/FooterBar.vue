<template>
    <footer class="d-flex justify-content-between border-top border-primary-subtle mt-5 py-2">
        <p class="ms-sm-3 ms-1 text-secondary">
            Made with
            <FontAwesomeIcon class="text-danger" beat icon="fa-solid fa-heart" size="lg" /> by Team
            FDFZ CityRush
        </p>
        <div class="me-sm-3 d-flex me-1">
            <a href="https://github.com/jeremy0519/cityrush" target="_blank" class="text-reset"
                ><FontAwesomeIcon
                    style="cursor: pointer"
                    class="me-1"
                    icon="fa-brands fa-github"
                    size="lg"
            /></a>

            <RouterLink to="/status" class="nav-link text-secondary">Status</RouterLink>
        </div>
    </footer>

    <footer class="footer items-center bg-neutral p-4 text-neutral-content">
        <aside class="grid-flow-col items-center">
            <img src="/favicon.webp" width="36" height="36" />
            <p class="">
                Made with
                <FontAwesomeIcon style="color: red" beat icon="fa-solid fa-heart" size="lg" /> by
                Team FDFZ CityRush
            </p>
        </aside>
        <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://github.com/jeremy0519/cityrush" target="_blank"
                ><FontAwesomeIcon
                    style="cursor: pointer"
                    class="me-1"
                    icon="fa-brands fa-github"
                    size="lg"
            /></a>
            <a href="https://github.com/jeremy0519/cityrush" target="_blank"
                ><FontAwesomeIcon
                    style="cursor: pointer"
                    class="me-1"
                    icon="fa-brands fa-weixin"
                    size="lg"
            /></a>
        </nav>
    </footer>
</template>
