<template>
    <div>
        <br />
        <div style="text-align: center;">
            <b style="margin-right: 10px;">Please choose the testing method: </b>
            <el-select v-model="selected_method" placeholder="Please Choose">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 20px;" @click="defaultTest">Go Testing !</el-button>
            <el-button type="success" style="margin-left: 20px;" @click="viewProgram">View The Program</el-button>
        </div>
        <el-divider></el-divider>
        <el-table :data="table_data" stripe border style="width: 100%">
            <el-table-column prop="number" label="Case Number" width="140">
            </el-table-column>
            <el-table-column label="Testing Case">
                <el-table-column prop="year" label="EdgeA" width="120">
                </el-table-column>
                <el-table-column prop="month" label="EdgeB" width="120">
                </el-table-column>
                <el-table-column prop="day" label="EdgeC" width="120">
                </el-table-column>
            </el-table-column>
            <el-table-column prop="predict" label="Predicted Output">
            </el-table-column>
            <el-table-column prop="actual" label="Actual Output">
            </el-table-column>
            <el-table-column prop="result" label="Testing Result" width="140">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.result == 'Correct' ? 'success' : 'danger'" disable-transitions>
                        {{scope.row.result}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: 'boundary',
                    label: 'Boundary Testing'
                }, {
                    value: 'equivclass',
                    label: 'Equivalence-Class Testing'
                }],
                selected_method: 'boundary',
                table_data: [],
                boundary_data: [
                    ["W1", 2021, 6, 1, "2021/6/2", "2021/6/2"],
                    ["W2", 2020, 5, 2, "2020/5/3", "2020/5/3"],
                    ["W3", 2018, 6, 30, "2018/7/1", "2018/7/1"],
                    ["W4", 2019, 7, 31, "2019/8/1", "2019/8/1"],
                    ["W5", 1980, 1, 16, "1980/1/17", "1980/1/17"],
                    ["W6", 1999, 2, 17, "1999/2/18", "1999/2/18"],
                    ["W7", 2023, 11, 14, "2023/11/15", "2023/11/15"],
                    ["W8", 2010, 12, 15, "2010/12/16", "2010/12/16"],
                    ["W9", 1900, 5, 20, "1900/5/21", "1900/5/21"],
                    ["W10", 1901, 6, 17, "1901/6/18", "1901/6/18"],
                    ["W11", 2199, 6, 15, "2199/6/16", "2199/6/16"],
                    ["W12", 2012, 8, 19, "2012/8/20", "2012/8/20"],
                    ["W13", 1898, 6, 12, "Year must not be less than 1900.", "Year must not be less than 1900."],
                    ["W14", 1921, 14, 22, "Month must be between 1 and 12.", "Month must be between 1 and 12."],
                    ["W15", 1935, 3, 34, "Day is illegal.", "Day is illegal."],
                    ["W16", 2012, 4, 31, "Day is illegal.", "Day is illegal."],
                    ["W17", 2012, 2, 30, "Day is illegal.", "Day is illegal."],
                    ["W18", 2013, 2, 29, "Day is illegal.", "Day is illegal."]
                ],
                equiv_data: [
                    ["W1", 2020, 12, 23, "2020/12/24", "2020/12/24"],
                    ["W2", 2021, 2, 28, "2021/3/1", "2021/3/1"],
                    ["W3", 2000, 2, 29, "2000/3/1", "2000/3/1"],
                    ["W4", 2003, 4, 30, "2003/5/1", "2003/5/1"],
                    ["W5", 2021, 8, 31, "2021/9/1", "2021/9/1"],
                    ["W6", 2100, 8, 21, "2100/8/22", "2100/8/22"],
                    ["W7", 2021, 12, 31, "2022/1/1", "2022/1/1"],
                    ["W8", 1899, 6, 1, "Year must not be less than 1900.", "Year must not be less than 1900."],
                    ["W9", 1999, 0, 1, "Month must be between 1 and 12.", "Month must be between 1 and 12."],
                    ["W10", 2001, 13, 12, "Month must be between 1 and 12.", "Month must be between 1 and 12."],
                    ["W11", 2021, 1, 0, "Day is illegal.", "Day is illegal."],
                    ["W12", 2021, 1, 32, "Day is illegal.", "Day is illegal."],
                    ["W13", 2022, 2, 29, "Day is illegal.", "Day is illegal."],
                    ["W14", 2000, 2, 30, "Day is illegal.", "Day is illegal."],
                    ["W15", 2021, 4, 31, "Day is illegal.", "Day is illegal."]
                ]
            }
        },
        methods: {
            handleClick() {
                console.log("calender test");
                axios({
                    url: '/api/searchByDay',
                    method: 'get',
                    params: {
                        year: 2020,
                        month: 3,
                        day: 26
                    }
                }).then((res) => {
                    console.log(res);
                })
            },
            defaultTest() {
                // alert(this.selected_method)
                var back_data = this.equiv_data;
                this.table_data = [];
                /*
                if (this.selected_method == "boundary") {
                    back_data = this.boundary_data;
                }
                console.log(back_data)
                console.log(back_data.length)
                for (var i = 0; i < back_data.length - 1; i++) {
                    var arr = back_data[i]
                    var res_str = "Correct"
                    if (arr[4] != arr[5]) {
                        res_str = "Incorrect"
                    }
                    this.table_data.push({
                        "number": arr[0],
                        "year": arr[1],
                        "month": arr[2],
                        "day": arr[3],
                        "actual": arr[4],
                        "predict": arr[5],
                        "result": res_str
                    })
                }
                console.log(thus.table_data)
                */
                this.$message('Data is loading...');
            },
            viewProgram() {
                this.$message('To be finished...');
            }
        }
    }
</script>

<style>
    .el-table td,
    .el-table th {
        text-align: center !important;
    }
</style>

<style scoped>

</style>
