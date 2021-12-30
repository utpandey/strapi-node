"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

let allocation_percent = 0;

module.exports = {
    lifecycles: {
        async afterCreate(data, result) {
            console.log("created!");
              console.log(result);
              console.log(data);
            if (result.alloc_emp) {
                let emp = await strapi
                    .query("employee")
                    .findOne({ id: result.alloc_emp });
                // console.log(emp);
                const allocPercent = result.alloc_percentage;
                let updatedStatus = await strapi
                    .query("employee")
                    .update(
                        { id: result.alloc_emp },
                        { emp_total_allocation: emp.emp_total_allocation + allocPercent }
                    );
                // console.log(updatedStatus);
            }
        },
        beforeUpdate: async (params) => {
            let oldAllocData = await strapi
                .query("allocation")
                .findOne({ id: params.id });
            console.log("oldAllocData  " + oldAllocData.alloc_percentage);
            if (oldAllocData.alloc_emp && oldAllocData.alloc_percentage) {
                allocation_percent = oldAllocData.alloc_percentage;
            }
            console.log("beforeUpdate let perc" + allocation_percent);
        },
        async afterUpdate(data) {
            console.log("afterUpdate let perc" + allocation_percent);
            console.log(data)
            if (
                data.alloc_emp.id &&
                data.alloc_percentage &&
                allocation_percent !== data.alloc_percentage
            ) {
                if (allocation_percent > data.alloc_percentage) {
                    console.log("now, we will decrease total alloc ");
                    let percentToDecrease = allocation_percent - data.alloc_percentage;
                    console.log(" perc to dec " + percentToDecrease);
                    let emp = await strapi
                        .query("employee")
                        .findOne({ id: data.alloc_emp.id });
                    //   console.log(emp);
                    let updatedStatus = await strapi.query("employee").update(
                        { id: data.alloc_emp.id },
                        {
                            emp_total_allocation:
                                emp.emp_total_allocation - percentToDecrease,
                        }
                    );
                    //   console.log(updatedStatus);
                } else {
                    console.log("now, we will increase total alloc ");
                    let percentToAdd = data.alloc_percentage - allocation_percent;
                    console.log(allocation_percent);
                    console.log(" perc to inc " + percentToAdd);
                    console.log(data);
                    let emp = await strapi
                        .query("employee")
                        .findOne({ id: data.alloc_emp.id });
                    // console.log(emp);
                    let updatedStatus = await strapi.query("employee").update(
                        { id: data.alloc_emp.id },
                        {
                            emp_total_allocation: emp.emp_total_allocation + percentToAdd,
                        }
                    );
                    // console.log(updatedStatus);
                }
            }
        },
        async afterDelete(result, params) {
            console.log(result);
            let emp = await strapi
                .query("employee")
                .findOne({ id: result.alloc_emp.id });
            let updatedStatus = await strapi.query("employee").update(
                { id: result.alloc_emp.id },
                {
                    emp_total_allocation:
                        emp.emp_total_allocation - result.alloc_percentage,
                }
            );
            console.log(emp)
            console.log(updatedStatus);
        },
    },
};