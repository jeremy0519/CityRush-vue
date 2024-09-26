<template>
    <div class="navbar bg-primary text-primary-content">
        <div class="navbar-start">
            <details class="dropdown">
                <summary class="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </summary>
                <ul
                    class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-primary p-2 text-primary-content shadow">
                    <li>
                        <RouterLink to="/" active-class="active">首页</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/events" active-class="active">活动列表</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/me" active-class="active">个人主页</RouterLink>
                    </li>
                </ul>
            </details>
            <a class="btn btn-ghost text-xl">FDFZ城市定向社</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li>
                    <RouterLink to="/" active-class="active">首页</RouterLink>
                </li>
                <li>
                    <RouterLink to="/events" active-class="active">活动列表</RouterLink>
                </li>
                <li>
                    <RouterLink to="/me" active-class="active">个人主页</RouterLink>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <RouterLink to="/match" class="btn btn-accent" active-class="btn-active"
                >进入比赛</RouterLink
            >
        </div>
    </div>
</template>
