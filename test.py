# hash table for numbers using list and dict or map
n=[10,5,8,8,8,10,3,3,2,2,5,5,6,4,1]
m = [10,5,6,7,1,2,0]
hash_dic = dict(map(lambda x: (x, 0), range(max(m) +1)))
hash_list = [0 for _ in range(max(m) +1 )]
for num in n:
    hash_list[num] +=1 
    hash_dic[num] +=1 
for num in m:
    if num<0 or num >max(m):
        print(0)
    else:
        print(f'"{num} in list have : "',hash_list[num])
        print(f'"{num} in dic have : "',hash_dic[num])
print(hash_list)
print(hash_dic)
# ##########################
#  hash table for strings
n = "aavvaasiisssmmuumppppoookdtfzz"
m = "abpoytmnvcz"
hash_dic = dict(map(lambda x: (x, 0), range(26)))
hash_list = [0 for _ in range(26)]
for ch in n:
    asci_val = ord(ch)
    val = asci_val - 97
    hash_list[val] += 1
    hash_dic[val] += 1
for ch in m:
    asci_val = ord(ch)
    val = asci_val - 97
    if val<0 or val >28:
        print(0)
    else:
        print(f'"{ch} in list have : "',hash_list[val])
        print(f'"{ch} in dic have : "',hash_dic[val])
print(hash_list)
print(hash_dic)