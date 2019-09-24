# AFFECTED=$(npm run affected:libs)

# echo "affected libs: $AFFECTED"


# # substring= $AFFECTED | grep -qE '/-\s{1}(.+?)'

# # echo "$substring";


# a="ifeelfat398pounds"
# b=${a/[a-zA-Z]/}
# echo $b

node ./scripts/deploy.js
