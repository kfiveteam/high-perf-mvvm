var Child = san.defineComponent({
  template: `<div>{{p}}</div>`,
});

var MyApp = san.defineComponent({
  template: `<div>
    <child p="aaa"><child>
  </div>`,
  components: {
    Child
  }
});
