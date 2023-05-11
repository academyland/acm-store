

const parseField = (field) => {
    const dataArray = field.split(" ");
    return {
      attribute: dataArray[0],
      isRequired: dataArray[1] === "required" || dataArray[1] === "r",
    };
  };

export default function(/** @type {import('plop').NodePlopAPI} */ plop){
    plop.setHelper("parseFields", (fields) => {
        const dataArray = fields.split(",");
        return dataArray.map((item) => {
         return parseField(item);
        });
      });
    

    plop.setGenerator("validator",{
        description: "generate validator",
        prompts:[
            {type:'input',name: 'name' ,"message":"name of your module you want generate validator for it?"},
            {
                type: "input",
                name: "fields",
                message: "enter fields separate with ',' (name r,code,...)",
           },
        ],
        actions: [
            {
              type: "add",
              path: "composables/{{camelCase name}}/{{pascalCase name}}.validator.ts",
              templateFile: "plop-templates/validator.hbs",
            },
          ],
    })
}