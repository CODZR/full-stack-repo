/**
* @param {number[]} nums
* @param {number} target
* @return {number[]} 索引
*/
export const twoSum = function(nums, target) {
  const len = nums.length;
  const hash = {};
  for (let i = 0; i < len; i++ ) {
    if ( hash[target - nums[i]] !== undefined) {
      console.log(hash);
      return [hash[target - nums[i]],i];
    }
    hash[nums[i]] = i;   
  }
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
export const threeSum = function(nums, target) {
  const ans = [];
  const len = nums.length;
  if(nums === null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len ; i++) {
    if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if(i > 0 && nums[i] === nums[i-1]) continue; // 去重
    let L = i+1;
    let R = len-1;
    while(L < R){
      const sum = nums[i] + nums[L] + nums[R];
      if(sum === target){
        ans.push([nums[i],nums[L],nums[R]]);
        while (L<R && nums[L] === nums[L+1]) L++; // 去重
        while (L<R && nums[R] === nums[R-1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < target) L++;
      else if (sum > target) R--;
    }
  }        
  return ans;
};

export const fourSum = function(nums, target) {
  const quadruplets = [];
  if (nums.length < 4) {
    return quadruplets;
  }
  nums.sort((x, y) => x - y);
  const length = nums.length;
  for (let i = 0; i < length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }
    if (nums[i] + nums[length - 3] + nums[length - 2] + nums[length - 1] < target) {
      continue;
    }
    for (let j = i + 1; j < length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }
      if (nums[i] + nums[j] + nums[length - 2] + nums[length - 1] < target) {
        continue;
      }
      let left = j + 1, right = length - 1;
      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum === target) {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          left++;
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return quadruplets;
};
