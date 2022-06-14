<template>
    <el-row class="tac" style="height: 100%;">
        <el-col :span="24" style="height: 100%;">
            <el-menu :uniqueOpened="true" :default-active="$route.path" class="el-menu-vertical-demo"
                :router="true" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b">
                <h3 style="color: bisque;">Software Testing</h3>
                <el-menu-item index="/triangle">
                    <i class="el-icon-caret-top"></i>
                    <template #title>Triangle</template>
                </el-menu-item>
                <el-menu-item index="/calendar">
                    <i class="el-icon-date"></i>
                    <template #title>Calendar</template>
                </el-menu-item>
                <el-menu-item index="/seller">
                    <i class="el-icon-monitor"></i>
                    <template #title> Seller </template>
                </el-menu-item>
                <el-menu-item index="/telegram">
                    <i class="el-icon-mobile-phone"></i>
                    <template #title>Telegram</template>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>


<script>
    export default {
        
    }
</script>

<style scoped>
    ul {
        height: 100%;
        text-align: center;
    }
    li {
        /*text-align: center;*/
    }
</style>