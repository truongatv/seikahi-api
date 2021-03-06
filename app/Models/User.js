'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  home () {
    return this.belongsTo('App/Models/Home')
  }

  living_costs () {
    return this
        .belongsToMany('App/Models/LivingCost')
        .pivotModel('App/Models/Beneficiary')
  }



}

module.exports = User
