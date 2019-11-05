
def triangle_type(a,b,c):
    if(a <= b + c and b <= a + c and c <= a + b and a >0 and b>0 and c>0):
        if(a == b == c):
           return "Regular"
        else: 
           if(a == b or a == c or b == c):
             return "Isosceles"
           else:
            return "Normal"
    else:
        return "Not a valid triangle"

print(triangle_type(1,2,3))
print(triangle_type(1,1,1))
print(triangle_type(5,5,1))