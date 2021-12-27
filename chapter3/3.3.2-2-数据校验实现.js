var dataTypes = this.dataTypes || clazz.dataTypes;
if (dataTypes) {
    var dataTypeChecker = createDataTypesChecker(
    dataTypes,
        this.name || clazz.name
    );
    this.data.setTypeChecker(dataTypeChecker);
    this.data.checkDataTypes();
}

function createDataTypesChecker(dataTypes, componentName) {

    /**
     * 校验data是否满足dataTypes的格式
     *
     * @param  {*} data 数据
     */
    return function (data) {
        for (var dataTypeName in dataTypes) {
            if (dataTypes.hasOwnProperty(dataTypeName)) {

                var dataTypeChecker = dataTypes[dataTypeName];

                if (typeof dataTypeChecker !== 'function') {
                    throw new Error('[SAN ERROR] '
                        + componentName + ':' + dataTypeName + ' is invalid; '
                        + 'it must be a function, usually from san.DataTypes'
                    );
                }

                dataTypeChecker(
                    data,
                    dataTypeName,
                    componentName,
                    dataTypeName
                );
            }
        }
    };
}
