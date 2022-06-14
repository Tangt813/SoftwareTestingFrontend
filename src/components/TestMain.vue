<template>
    <div style="width: 100%;">
        <div v-if="testing">
            <br />
            <div style="text-align: center;">
                <b style="margin-right: 10px;">Please choose the testing method: </b>
                <el-select v-model="selected_method" placeholder="Please Choose">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 20px;" @click="defaultTest">Use Default Test Cases
                </el-button>
                <el-button type="warning" style="margin-left: 20px;" @click="triggerUpload">Upload Test Cases
                </el-button>
                <el-upload style="display: none" :limit="1" action="" accept=".xlsx" :before-upload="readExcelFile">
                    <el-button style="display: none" id="smt_file"></el-button>
                </el-upload>
                <el-button type="success" style="margin-left: 20px;" @click="changePage">View the Program</el-button>
            </div>
            <el-divider></el-divider>
            <div style="height: 79vh; border: 1px solid rgb(233, 227, 227);">
                <el-scrollbar style="height: 100%;" wrap-style="overflow-x:hidden;">
                    <el-table :data="table_data" stripe border style="width: 100%">
                        <el-table-column prop="number" label="Case Number" width="140">
                        </el-table-column>
                        <el-table-column label="Testing Case">
                            <el-table-column v-for="item in paras" :prop="item[0]" :label="item[1]" :width="col_width">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="predict" label="Predicted Output">
                        </el-table-column>
                        <el-table-column prop="actual" label="Actual Output">
                        </el-table-column>
                        <el-table-column prop="result" label="Testing Result" width="140">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.result == 'Correct' ? 'success' : 'danger'"
                                    v-show="scope.row.result != 'None'" disable-transitions>
                                    {{scope.row.result}}
                                </el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </div>
        </div>
        <div v-else>
            <br />
            <el-button type="success" style="margin-left: 10px;" @click="changePage">Back to Testing</el-button>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="12">
                    <div style="margin-left: 20%; width: 60%;">
                        <el-form label-position="top" label-width="80px" :model="form_data">
                            <el-form-item v-for="item in paras" :label="item[1]">
                                <el-input v-model="form_data[item[0]]"></el-input>
                            </el-form-item>
                        </el-form>
                        <div style="width: 100%; text-align: center; margin-top: 40px;">
                            <el-button type="success" @click="submitData">Submit</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div style="margin-left: 20%; width: 60%;">
                        <el-form label-position="top" label-width="80px">
                            <el-form-item label="Result">
                                <el-input type="textarea" :disabled="true" v-model="program_result"
                                    :rows="result_height" id="result_area"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import xlsx from 'xlsx'
    export default {
        props: {
            theme: String
        },
        data() {
            return {
                testing: true,
                col_width: 120,
                result_height: 7,
                options: [{
                    value: 'boundary',
                    label: 'Boundary Testing'
                }, {
                    value: 'equivclass',
                    label: 'Equivalence-Class Testing'
                }],
                selected_method: 'boundary',
                table_data: [],
                all_paras: {
                    "calendar": [["year", "Year"], ["month", "Month"], ["day", "Day"]],
                    "triangle": [["edgeA", "Edge A"], ["edgeB", "Edge B"], ["edgeC", "Edge C"]],
                    "seller": [["hostNum", "Host Number"], ["monitorNum", "Monitor Number"], ["peripheralNum", "Peripheral Number"]],
                    "telegram": [["callTime", "Call Duration"], ["notPayCount", "Default Times"]]
                },
                paras: [],
                form_data: {},
                program_result: ""
            }
        },
        created() {
            this.initVaribles();
        },
        watch: {
            theme(val) {
                this.initVaribles();
            }
        },
        methods: {
            submitData() {
                console.log(this.form_data);
                this.$axios({
                    method: "post",
                    url: this.theme + "/program",
                    params: this.form_data
                }).then((res) => {
                    console.log(res.data);
                    this.program_result = res.data;
                });
            },
            initVaribles() {
                this.paras = this.all_paras[this.theme];
                this.program_result = "";
                this.selected_method = "boundary";
                this.table_data = [];
                this.form_data = {};
                this.col_width = 400 / this.paras.length;
                if (this.col_width < 100) {
                    this.col_width = 100;
                }
                this.result_height = 5 * this.paras.length - 3;
            },
            updateTableData(back_data) {
                this.table_data = [];
                console.log(back_data)
                console.log(back_data.length)
                if (back_data.length == 0) {
                    this.$message({
                        message: 'The method is not available for the problem.',
                        type: 'warning'
                    });
                }
                for (var i = 0; i < back_data.length; i++) {
                    var arr = back_data[i]
                    var new_data = { "number": arr[0] };
                    var cur = 1;
                    for (var j = 0; j < this.paras.length; j++) {
                        new_data[this.paras[j][0]] = arr[cur++];
                    }
                    var res_str = "Correct"
                    if (arr[cur].length == 0) {
                        res_str = "None";
                    } else if (arr[cur] != arr[cur + 1]) {
                        res_str = "Incorrect";
                    }
                    new_data["actual"] = arr[cur];
                    new_data["predict"] = arr[cur + 1];
                    new_data["result"] = res_str;
                    console.log(new_data)
                    this.table_data.push(new_data);
                }
                console.log(this.table_data)
            },
            defaultTest() {
                // alert(this.selected_method)
                console.log(this.theme);
                var ask_url = this.selected_method == "boundary" ? "/boundaryTest" : "/equivClassTest";
                var back_data = []
                this.$axios({
                    method: "post",
                    url: this.theme + ask_url,
                }).then((res) => {
                    back_data = res.data
                    this.updateTableData(back_data);
                });
            },
            triggerUpload() {
                document.getElementById("smt_file").click();
            },
            judgeFileType(file) {
                console.log(file);
            },
            UploadUrl() {
                return this.theme + "/uploadTestCases";
            },
            loadData(res) {
                var back_data = res.data
                this.updateTableData(back_data);
            },
            readExcelFile(obj) {
                const reader = new FileReader()
                const _this = this;
                reader.readAsArrayBuffer(obj)
                reader.onload = function () {
                    const buffer = reader.result
                    const bytes = new Uint8Array(buffer)
                    const length = bytes.byteLength
                    let binary = ''
                    for (let i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i])
                    }
                    const XLSX = require('xlsx')
                    const wb = XLSX.read(binary, {
                        type: 'binary'
                    })
                    const outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
                    var tmp_data = [...outdata]
                    console.log(tmp_data);
                    var file_data = {
                        method: _this.selected_method,
                        // data: tmp_data
                        data: JSON.stringify(tmp_data)
                    }
                    // console.log(file_data);
                    _this.$axios({
                        method: "post",
                        url: _this.theme + "/programTest",
                        params: file_data
                    }).then((res) => {
                        // console.log(res.data);
                        _this.updateTableData(res.data);
                    });
                }
                return false;
            },
            changePage() {
                this.testing = !this.testing;
            }
        }
    }
</script>

<style>
    .el-table td,
    .el-table th {
        text-align: center !important;
        min-height: 32px;
    }

    #result_area {
        background-color: rgb(254, 255, 252);
        color: black;
        font-size: 18px;
        cursor: default;
    }
</style>

<style scoped>
    .el-form--label-top {
        font-weight: 700;
        color: black;
    }
</style>
