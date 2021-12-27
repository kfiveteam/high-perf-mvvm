if (this.binds && this.scope) {
  for (var i = 0, l = this.binds.length; i < l; i++) {
    var bindInfo = this.binds[i];

    var value = evalExpr(bindInfo.expr, this.scope, this.owner);
    if (typeof value !== 'undefined') {
      initData[bindInfo.name] = value;
    }
  }
}