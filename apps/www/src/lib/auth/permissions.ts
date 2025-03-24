import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  project: ['create', 'share', 'update', 'delete'],
} as const;

const ac = createAccessControl(statement);

const student = ac.newRole({
  project: ['create'],
})

const educator = ac.newRole({
  project: ['create', 'update', 'delete']
})

const admin = ac.newRole({
  project: ['create', 'share', 'update', 'delete']
})

const superAdmin = ac.newRole({
  project: ['create', 'share', 'update', 'delete']
})

export { ac, student, educator, admin, superAdmin };