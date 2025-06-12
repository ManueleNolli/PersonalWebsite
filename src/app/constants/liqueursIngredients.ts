export enum Flavour {
  FRESH_AND_DELICATE = 'Fresh and delicate',
  BALANCED = 'Balanced',
  RICH_AND_FULL = 'Rich and full',
}

type LiqueurIngredient = {
  name: string
  imagePath: string
}

type LiqueurProperty = {
  partToBeMacerated: string
  afterMacerationPercentage: number
  minIngredientPer100ml: number
  maxIngredientPer100ml: number
  ingredientWaterPercentage: number
  macerationTime: string[]
  colors: {
    light: string
    medium: string
    strong: string
  },
  computeFlavour: (macerationTime: string) => Flavour
}

type LiqueurPreset = {
  alcohol: number,
  finalPercentage: number
  sugarContent: number
  macerationTime: string
}

export type Liqueur = {
  ingredient: LiqueurIngredient
  property: LiqueurProperty
  preset: LiqueurPreset
}

export const liqueurs: Liqueur[] = [
  {
    ingredient: {
      name: 'Lemon',
      imagePath: '/assets/mixology/lemon.png',
    },
    property: {
      partToBeMacerated: 'Zest',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 10,
      maxIngredientPer100ml: 30,
      ingredientWaterPercentage: 70,
      macerationTime: ['1 day', '2 days', '3 days'],
      colors: {
        light: '#FFF9C4',
        medium: '#FFEB3B',
        strong: '#FBC02D',
      },
      computeFlavour: (macerationTime: string) => {
        switch (macerationTime) {
          case '1 day':
            return Flavour.FRESH_AND_DELICATE
          case '2 days':
            return Flavour.BALANCED
          case '3 days':
            return Flavour.RICH_AND_FULL
          default:
            return Flavour.FRESH_AND_DELICATE
        }
      },
    },
    preset: {
      alcohol: 500,
      finalPercentage: 25,
      sugarContent: 200,
      macerationTime: '1 day',
    },
  },
  {
    ingredient: {
      name: 'Basil',
      imagePath: '/assets/mixology/basil.png',
    },
    property: {
      partToBeMacerated: 'Leaves',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 10,
      maxIngredientPer100ml: 30,
      ingredientWaterPercentage: 70,
      macerationTime: ['12 hours', '24 hours', '36 hours'],
      colors: {
        light: '#A8D5BA',
        medium: '#6B8E23',
        strong: '#556B2F',
      },
      computeFlavour: (macerationTime: string) => {
        switch (macerationTime) {
          case '12 hours':
            return Flavour.FRESH_AND_DELICATE
          case '24 hours':
            return Flavour.BALANCED
          case '36 hours':
            return Flavour.RICH_AND_FULL
          default:
            return Flavour.FRESH_AND_DELICATE
        }
      },

    },
    preset: {
      alcohol: 100,
      finalPercentage: 35,
      sugarContent: 150,
      macerationTime: '24 hours',
    },
  },
  {
    ingredient: {
      name: 'Mint',
      imagePath: '/assets/mixology/mint.png',
    },
    property: {
      partToBeMacerated: 'Leaves',
      afterMacerationPercentage: 95,
      minIngredientPer100ml: 0,
      maxIngredientPer100ml: 100,
      ingredientWaterPercentage: 70,
      macerationTime: ['12 hours', '24 hours', '36 hours'],
      colors: {
        light: '#A8D5BA',
        medium: '#6B8E23',
        strong: '#556B2F',
      },
      computeFlavour: (macerationTime: string) => {
        switch (macerationTime) {
          case '12 hours':
            return Flavour.FRESH_AND_DELICATE
          case '24 hours':
            return Flavour.BALANCED
          case '36 hours':
            return Flavour.RICH_AND_FULL
          default:
            return Flavour.FRESH_AND_DELICATE
        }
      },
    },
    preset: {
      alcohol: 400,
      finalPercentage: 20,
      sugarContent: 150,
      macerationTime: '24 hours',
    },
  },
]
