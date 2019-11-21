<template>
  <div id="app">
    <treeselect
      v-if="id"
      v-model="id"
      :multiple="false"
      :options="options"
      placeholder="请选择"
      :disabled="disabled"
    />
    <treeselect
      v-if="!id"
      :multiple="false"
      :options="options"
      placeholder="请选择"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { Treeselect },
  props: ["dataList", "dataId", "nameList", "rootId", "disabled"],
  data() {
    return {
      options: [],
      dataMap: new Map(),
      parentSonIdMap: new Map(),
      gradeDataMapping: [],
      id: ""
    };
  },

  watch: {
    dataList(val) {
      if (val) {
        this.gradeDataMapping = [];
        this.dataMap = new Map();
        this.parentSonIdMap = new Map();
        this.formatData(val);
        this.findChildLoop(this.gradeDataMapping);
        this.options = this.gradeDataMapping;
      }
    },
    dataId(val) {
      if (val) {
        this.id = val;
        
      }
    },
    id(val) {
      this.$emit("id", val);
    }
  },
  methods: {
    formatData(val) {
      let dataList = val,
        [idName, labelName, parentIdName] = this.nameList.split(","),
        rootId = this.rootId,
        that = this;

      Array.map(dataList, dataItem => {
        let id = dataItem[idName],
          label = dataItem[labelName],
          parentId = dataItem[parentIdName],
          formatDataItem = {
            id,
            label,
            parentId
          };

        that.dataMap.set(id, formatDataItem);

        let sonIdArr = that.parentSonIdMap.get(parentId);
        if (!sonIdArr) {
          sonIdArr = [];
        }
        sonIdArr.push(id);
        that.parentSonIdMap.set(parentId, sonIdArr);
        if (parentId == rootId) {
          that.gradeDataMapping.push(formatDataItem);
        }
      });
    },
    findChildLoop(list) {
      let that = this;
      Array.map(list, item => {
        let childIdArr = that.parentSonIdMap.get(item.id);
        if (childIdArr && childIdArr.length) {
          Array.map(childIdArr, childId => {
            if (!item.children) item.children = [];
            item.children.push(that.dataMap.get(childId));
          });
          that.findChildLoop(item.children);
        }
      });
    }
  }
};
</script>