'use strict'

// @see https://stackoverflow.com/a/53930826/4960244
// {CWU} Changes_When_Uppercased
// {CWL} Changes_When_Lowercased

const uppercaseToFirstLetter = (str, locale) => str.replace(/^\p{CWU}/u, char => char.toLocaleUpperCase(locale))

const lowercaseToFirstLetter = (str, locale) => str.replace(/^\p{CWL}/u, char => char.toLocaleLowerCase(locale))

const constructFullName = (data, id = 0) => {
  if (data._given_name || data._middle_name || data._family_name) data._full_name = [data._given_name, data._middle_name, data._family_name].filter(Boolean).join(' ')
  else data._full_name = 'Anonyme ' + id
  if (!data._given_name && !data._middle_name && data._family_name) data._full_name = uppercaseToFirstLetter(data._family_name)
  return data._full_name
}

const constructPrefixFullNameSuffix = (data, id) => {
  data._prefix_full_name_suffix = data._full_name
  if (data._prefix && data._full_name) data._prefix_full_name_suffix = data._prefix.concat(' ', data._prefix_full_name_suffix)
  if (data._full_name && data._suffix) data._prefix_full_name_suffix = data._prefix_full_name_suffix.concat(', ', data._suffix)
  return data._prefix_full_name_suffix
}

module.exports = {
  uppercaseToFirstLetter: uppercaseToFirstLetter,
  lowercaseToFirstLetter: lowercaseToFirstLetter,
  constructFullName: constructFullName,
  constructPrefixFullNameSuffix: constructPrefixFullNameSuffix
}
